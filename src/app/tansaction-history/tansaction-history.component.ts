import { Component, OnInit, Input } from '@angular/core';

import {Transaction} from '../transaction';
import {TransactionService} from '../transaction.service';
import { TransactionAccount } from '../transactionAccount';

@Component({
  selector: 'app-tansaction-history',
  templateUrl: './tansaction-history.component.html',
  styleUrls: ['./tansaction-history.component.css']
})
export class TansactionHistoryComponent implements OnInit {
  @Input() user: number;

  constructor(private transactionService: TransactionService) { }

  allTransactions: Transaction[] = [];
  allTransactionsWithAccount: TransactionAccount[] = [];

  ngOnInit() {
    this.getTransactionsByUser();
  }


  getTransactionsByUser(): void {
    this.transactionService.getTransactionsByUser(this.user)
      .subscribe(transactions => {
          this.allTransactionsWithAccount = transactions;
        }
      );
  }

}
