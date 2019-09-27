import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Account } from '../account';
import { Transaction } from '../transaction';

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
    (document.getElementById('memo') as HTMLInputElement).hidden = false;
  }

  enableTransfer() {
    this.clearFields();
    this.transactionService.getAccountByUserID(this.user).subscribe(account => this.accountsFrom = account);
    this.transactionService.getAccountByUserID(this.user).subscribe(account => this.accountsTo = account);
    (document.getElementById('toAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('memo') as HTMLInputElement).hidden = false;
  }

  enableWithdraw() {
    this.clearFields();
    this.transactionService.getAccountByUserID(this.user).subscribe(account => this.accountsFrom = account);
    (document.getElementById('toAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('memo') as HTMLInputElement).hidden = false;
}

  onSelectToAccount(account: Account) {
    this.selectToAccount = account;
    this.toAccountName = this.selectToAccount.name;
    this.toAccountId = this.selectToAccount.id;
  }

  onSelectFromAccount(account: Account) {
    this.selectFromAccount = account;
    this.fromAccountName = this.selectFromAccount.name;
    this.fromAccountId = this.selectFromAccount.id;
  }

  addDeposit(amount: number, toAccountId: number): void {
    let memo: 'test';
    let fromAccountId: null;
    let transactionType: 1;

    console.log('Amount', amount);
    console.log('to Account ID', toAccountId);

    if (!amount) {
        return;
    }
    const transactionDt = new Date().toJSON();
    this.transactionService.addTransaction({
        amount,
        memo,
        fromAccountId,
        toAccountId,
        transactionType,
        transactionDt
      } as unknown as Transaction)
        .subscribe(transaction => this.transaction = transaction);
   }

  cancelTransaction() {
    this.clearFields();
    (document.getElementById('toAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = true;
  }

  private clearFields() {
    this.toAccountName = resetToForm;
    this.toAccountId = null;

    this.fromAccountName = resetFromForm;
    this.fromAccountId = null;
}
}
