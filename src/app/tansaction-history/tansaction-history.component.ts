import { Component, OnInit, Input } from '@angular/core';

import {Transaction} from '../transaction';
import {TransactionService} from '../transaction.service';

@Component({
  selector: 'app-tansaction-history',
  templateUrl: './tansaction-history.component.html',
  styleUrls: ['./tansaction-history.component.css']
})
export class TansactionHistoryComponent implements OnInit {
  @Input() user: number;

  constructor(private transactionService: TransactionService) { }

  allTransactions: Transaction[] = [];

  ngOnInit() {
    this.getLatestTransactionsByUser();
  }

  getLatestTransactionsByUser(): void {
    this.transactionService.getLatestTransactionsByUser(this.user)
      .subscribe(transactions => {
          this.allTransactions = transactions;
        }
      );
  }

}
