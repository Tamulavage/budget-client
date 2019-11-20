import { Component, OnInit, Input } from '@angular/core';

import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { TransactionAccount } from '../models/transactionAccount';
import { Checkbook } from '../models/checkbook';
import { Account } from '../models/account';

@Component({
  selector: 'app-tansaction-history',
  templateUrl: './tansaction-history.component.html',
  styleUrls: ['./tansaction-history.component.css']
})
export class TansactionHistoryComponent implements OnInit {
  @Input() user: number;

  constructor(private transactionService: TransactionService) { }

  allTransactionsWithAccount: TransactionAccount[] = [];
  mainCheckbook: Checkbook[] = [];
  accountNickName: string[] = [];

  displayedColumns: string[] = ['dateOfTransaction', 'memoTransaction', 'amountTransaction',
    'fromAccountName', 'toAccountName', 'accountOne', 'account2', 'account3', 'account4'
    , 'account5', 'account6', 'account7'];

  ngOnInit() {
    // this.getTransactionsByUser();
    this.getCheckbook();
  }


  getTransactionsByUser(): void {
    this.transactionService.getTransactionsByUser(this.user)
      .subscribe(transactions => {
        this.allTransactionsWithAccount = transactions;
      }
      );
  }

  getCheckbook(): void {
    this.transactionService.getTransactionsAndAccountInfo(this.user)
      .subscribe(transactions => {
        this.mainCheckbook = transactions;
        // TODO: make this more dynamic with a loop
        // console.log(transactions.map(t => t.accounts.length));
        this.accountNickName[0] = transactions.map(t => t.accounts[0].nickname).reduce((a, b) => a);
        this.accountNickName[1] = transactions.map(t => t.accounts[1].nickname).reduce((a, b) => a);
        this.accountNickName[2] = transactions.map(t => t.accounts[2].nickname).reduce((a, b) => a);
        this.accountNickName[3] = transactions.map(t => t.accounts[3].nickname).reduce((a, b) => a);
        this.accountNickName[4] = transactions.map(t => t.accounts[4].nickname).reduce((a, b) => a);
        this.accountNickName[5] = transactions.map(t => t.accounts[5].nickname).reduce((a, b) => a);
        this.accountNickName[6] = transactions.map(t => t.accounts[6].nickname).reduce((a, b) => a);
      }
      );
  }

  addNewChecking(): void {
    // TODO: create new modalDialog and call here
  }

}
