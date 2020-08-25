import { Component,  Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionAccount } from 'src/app/models/transactionAccount';

@Component({
  selector: 'app-transaction-update-memo',
  templateUrl: './transaction-update-memo.component.html',
  styleUrls: ['./transaction-update-memo.component.css']
})
export class TransactionUpdateMemoComponent  {

  memo: string;

  constructor(public dialogRef: MatDialogRef<TransactionUpdateMemoComponent>,
              @Inject(MAT_DIALOG_DATA) public transactionAccount: TransactionAccount,
              private transactionService: TransactionService) {
                // this.memo = transactionAccount.memo;
                this.populateUIdata();
               }

  populateUIdata() {
    this.memo = this.transactionAccount.memo;
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmUpdate(): void {
    this.transactionAccount.memo = this.memo;
    this.transactionService.updateTransaction(this.transactionAccount, null, null).subscribe();
  }

}
