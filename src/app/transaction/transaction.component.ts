import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Account } from '../account';
import { Transaction } from '../transaction';

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
  }

  accountsTo: Account[];
  selectToAccount: Account;
  toAccountName: string;
  toAccountId: number;
  transaction: Transaction;

  ngOnInit() {
  }

  enableDeposit() {
    this.transactionService.getAccountByUserID(this.user).subscribe(account => this.accountsTo = account);
    (document.getElementById('toAccount') as HTMLInputElement).hidden = false;
  }

  onSelectToAccount(account: Account) {
    this.selectToAccount = account;
    this.toAccountName = this.selectToAccount.name;
    this.toAccountId = this.selectToAccount.id;
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
  }

  private clearFields() {
    this.toAccountName = resetToForm;
    this.toAccountId = null;
}
}
