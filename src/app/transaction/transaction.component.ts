import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Account } from '../models/account';
import { Transaction } from '../models/transaction';

const resetFromForm = 'Select From :';
const resetToForm = 'Select To :';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input() user: number;

  constructor(private transactionService: TransactionService) {
    this.toAccountName = resetToForm;
    this.fromAccountName = resetFromForm;
  }

  selectToAccount: Account;
  accountsTo: Account[];
  toAccountName: string;
  toAccountId: number;

  transaction: Transaction;

  selectFromAccount: Account;
  accountsFrom: Account[];
  fromAccountName: string;
  fromAccountId: number;

  ngOnInit() {
  }

  enableDeposit() {
    this.clearFields();
    this.transactionService.getAccountByUserID(this.user).subscribe(account => this.accountsTo = account);
    (document.getElementById('toAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('depositHeader') as HTMLInputElement).hidden = false;

    (document.getElementById('inputFields') as HTMLInputElement).hidden = false;

    (document.getElementById('submitButtons') as HTMLInputElement).hidden = false;

    this.hideInitialButtons();
  }


  enableTransfer() {
    this.clearFields();
    this.transactionService.getAccountByUserID(this.user).subscribe(account => this.accountsFrom = account);
    this.transactionService.getAccountByUserID(this.user).subscribe(account => this.accountsTo = account);
    (document.getElementById('deposit') as HTMLInputElement).hidden = false;
    (document.getElementById('transferHeader') as HTMLInputElement).hidden = false;

    (document.getElementById('toAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = false;

    (document.getElementById('inputFields') as HTMLInputElement).hidden = false;

    (document.getElementById('submitButtons') as HTMLInputElement).hidden = false;

    this.hideInitialButtons();
  }

  enableWithdraw() {
    this.clearFields();
    this.transactionService.getAccountByUserID(this.user).subscribe(account => this.accountsFrom = account);
    (document.getElementById('toAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('withdrawHeader') as HTMLInputElement).hidden = false;

    (document.getElementById('inputFields') as HTMLInputElement).hidden = false;

    (document.getElementById('submitButtons') as HTMLInputElement).hidden = false;

    this.hideInitialButtons();
  }

  onSelectToAccount(account: Account) {
    this.selectToAccount = account;
    this.toAccountName = this.selectToAccount.nickname;
    this.toAccountId = this.selectToAccount.id;
  }

  onSelectFromAccount(account: Account) {
    this.selectFromAccount = account;
    this.fromAccountName = this.selectFromAccount.nickname;
    this.fromAccountId = this.selectFromAccount.id;

    (document.getElementById('fromAccountdrp') as HTMLInputElement).hidden = true;
  }

  addDeposit(amount: number, memo: string, fromAccountId: number, toAccountId: number): void {

    if (!amount) {
      console.log('Amount must not be null');
      return;
    }
    if (fromAccountId === toAccountId) {
      console.log('Cannot transfer to same account');
      return;
    }
    const transactionDt = new Date().toJSON();
    this.transactionService.addTransaction({
      amount,
      memo,
      fromAccountId,
      toAccountId,
      // transactionType,
      transactionDt
    } as unknown as Transaction)
      .subscribe(transaction => this.transaction = transaction);

    this.clearFields();
    this.showInitialBUttons();
  }

  cancelTransaction() {
    this.clearFields();
    (document.getElementById('toAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = true;

    (document.getElementById('inputFields') as HTMLInputElement).hidden = true;
    (document.getElementById('submitButtons') as HTMLInputElement).hidden = true;

    this.showInitialBUttons();
  }

  private clearFields() {
    this.toAccountName = resetToForm;
    this.toAccountId = null;

    this.fromAccountName = resetFromForm;
    this.fromAccountId = null;
  }

  private hideInitialButtons() {
    (document.getElementById('deposit') as HTMLInputElement).hidden = true;
    (document.getElementById('transfer') as HTMLInputElement).hidden = true;
    (document.getElementById('withdraw') as HTMLInputElement).hidden = true;

  }

  private showInitialBUttons() {
    (document.getElementById('deposit') as HTMLInputElement).hidden = false;
    (document.getElementById('transfer') as HTMLInputElement).hidden = false;
    (document.getElementById('withdraw') as HTMLInputElement).hidden = false;

    (document.getElementById('withdrawHeader') as HTMLInputElement).hidden = true;
    (document.getElementById('transferHeader') as HTMLInputElement).hidden = true;
    (document.getElementById('depositHeader') as HTMLInputElement).hidden = true;

    (document.getElementById('toAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = true;

    (document.getElementById('inputFields') as HTMLInputElement).hidden = true;
    (document.getElementById('submitButtons') as HTMLInputElement).hidden = true;
  }
}
