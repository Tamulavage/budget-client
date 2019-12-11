import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { FormControl, Validators } from '@angular/forms';
import { Account } from '../models/account';
import { MaintenanceSetting } from '../models/maintenanceSetting';

const resetFromForm = 'Select From :';
const resetToForm = 'Select To :';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {

  selectFromAccount: Account;
  accountsFrom: Account[];
  fromAccountName: string;
  fromAccountId: number;

  selectToAccount: Account;
  accountsTo: Account[];
  toAccountName: string;
  toAccountId: number;

  profileId: number;

  constructor(public dialogRef: MatDialogRef<TransactionAddComponent>,
              @Inject(MAT_DIALOG_DATA) public transaction: Transaction,
              @Inject(MAT_DIALOG_DATA) public budgetMaintenanceSetting: MaintenanceSetting,
              private transactionService: TransactionService) {
    this.profileId = budgetMaintenanceSetting.userId;
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  ngOnInit() {
    this.fromAccountName = resetFromForm;
    this.toAccountName = resetToForm;
    this.transactionService.getAccountByUserID(this.profileId).subscribe(account => this.accountsFrom = account);
    this.transactionService.getAccountByUserID(this.profileId).subscribe(account => this.accountsTo = account);
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(memo: string, amount: number): void {
    const transactionDt = new Date().toJSON();
    const fromAccountId = this.fromAccountId;
    const toAccountId = this.toAccountId;
    let fromAccountName = this.fromAccountName;
    let toAccountName = this.toAccountName;

    if (fromAccountName === resetFromForm) {
      fromAccountName = null;
    }
    if (toAccountName === resetToForm) {
      toAccountName = null;
    }
    if (fromAccountId === toAccountId) {
      console.log('Cannot transfer to same account');
    }
    this.transactionService.addTransaction({
      amount,
      memo,
      fromAccountId,
      toAccountId,
      transactionDt
    } as unknown as Transaction, fromAccountName, toAccountName)
      .subscribe();
  }

  onSelectFromAccount(account: Account) {
    this.selectFromAccount = account;
    this.fromAccountName = account.nickname;
    this.fromAccountId = account.id;
  }

  onSelectToAccount(account: Account) {
    this.selectToAccount = account;
    this.toAccountName = account.nickname;
    this.toAccountId = account.id;
  }

}
