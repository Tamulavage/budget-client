import { Component, OnInit, Input } from '@angular/core';

import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { TransactionAccount } from '../models/transactionAccount';
import { Checkbook } from '../models/checkbook';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tansaction-history',
  templateUrl: './tansaction-history.component.html',
  styleUrls: ['./tansaction-history.component.css']
})
export class TansactionHistoryComponent implements OnInit {
  @Input() user: number;

  constructor(private transactionService: TransactionService,
              public dialog: MatDialog) { }

  allTransactionsWithAccount: TransactionAccount[] = [];
  mainCheckbook: Checkbook[] = [];
  accountNickName: string[] = [];
  accountBank: string[] = [];

  displayedColumns: string[] = [
    'dateOfTransaction',
    'memoTransaction',
    'amountTransaction',
    'fromAccountName',
    'toAccountName'
    ];

  ngOnInit() {
    this.getCheckbook();
  }

  getCheckbook(): void {
    this.transactionService.getTransactionsAndAccountInfo(this.user)
      .subscribe(transactions => {
        this.mainCheckbook = transactions;

        this.populateRunningAmountHeaders(transactions);
      }
      );
  }

  populateRunningAmountHeaders(transactions: Checkbook[]) {

        const leng = transactions.map(t => t.accounts.length).reduce((a, b) => a);
        const accountName = 'account'; // used to add dynanically to matrix
        const maxShow = 7;

        for (let x = 0; x < leng && x < maxShow; x++) {
          this.displayedColumns.push(accountName + x);
          this.accountNickName[x] = transactions.map(t => t.accounts[x].nickname).reduce((a, b) => a);
          this.accountBank[x] = transactions.map(t => t.accounts[x].institutionName).reduce((a, b) => a);
        }
  }

  addNewTransaction(): void {
    // TODO: Add data from Model dialog back to main dataset
    const userId = this.user;
    const dialogRef = this.dialog.open(TransactionAddComponent, {
      data: {transaction: Transaction,  userId}
    });
  }

}
