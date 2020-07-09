import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';
import { TransactionAccount } from '../../models/transactionAccount';
import { Checkbook } from '../../models/checkbook';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, merge, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../models/account';

@Component({
  selector: 'app-tansaction-history',
  templateUrl: './tansaction-history.component.html',
  styleUrls: ['./tansaction-history.component.css'],
})
export class TansactionHistoryComponent implements OnInit {
  @Input() user: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  constructor(public httpClient: HttpClient,
              private transactionService: TransactionService,
              public dialog: MatDialog) { }

  allTransactionsWithAccount: TransactionAccount[] = [];

  tranasctionServiceLocal: TransactionService | null;
  dataSource: MainCheckbookTable | null;

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
    // TODO: refactor get Checkbook into loadData()
    this.getCheckbook();

    this.loadData();

  }

  public loadData() {
    this.tranasctionServiceLocal = new TransactionService(this.httpClient);
    // tslint:disable-next-line: no-use-before-declare
    this.dataSource = new MainCheckbookTable(this.tranasctionServiceLocal, this.paginator, this.sort, this.user);
    fromEvent(this.filter.nativeElement, 'keyup')
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  getCheckbook(): void {
    this.transactionService.getTransactionsAndAccountInfo(this.user)
      .subscribe(transactions => {

        this.populateRunningAmountHeaders(transactions);
      }
      );
  }

  populateRunningAmountHeaders(transactions: Checkbook[]) {

    const leng = transactions.map(t => t.accounts.length).reduce((a, b) => a);
    const accountName = 'account'; // used to add dynamically to matrix
    const maxShow = 7;

    for (let x = 0; x < leng && x < maxShow; x++) {
      this.displayedColumns.push(accountName + x);
      this.accountNickName[x] = transactions.map(t => t.accounts[x].nickname).reduce((a, b) => a);
      this.accountBank[x] = transactions.map(t => t.accounts[x].institutionName).reduce((a, b) => a);
    }
  }

  addNewTransaction(): void {
    const userId = this.user;
    const dialogRef = this.dialog.open(TransactionAddComponent, {
      data: { transaction: Transaction, userId }
    });

    dialogRef.afterClosed().subscribe(
      x => {
        // if (x === 1) {
          const checkbookRow: Checkbook = this.transactionService.getDialogData();
          checkbookRow.transactionDt = checkbookRow.transactionDt.substring(0, 10);

          const accounts: Account[]  = this.updateRunningTransactionValues(checkbookRow);

          checkbookRow.accounts = accounts;
          this.tranasctionServiceLocal.dataChange.value.unshift(checkbookRow);
          this.paginator._changePageSize(this.paginator.pageSize);
        // }
      }
    );
  }

  updateRunningTransactionValues(checkbookRow: Checkbook): Account[] {

    const accountsTemp: Account[] = [];

    this.dataSource.connect();

    this.dataSource.renderedData[0].accounts.forEach(v => {
          const accountTemp = new Account();
          if (v.id === checkbookRow.fromAccountId) {
            accountTemp.balance = v.balance - checkbookRow.amount;
          } else if (v.id === checkbookRow.toAccountId) {
            accountTemp.balance = v.balance + checkbookRow.amount;
          } else {
            accountTemp.balance = v.balance;
          }
          accountsTemp.push(accountTemp);
        }
     );

    return accountsTemp;
  }
}

export class MainCheckbookTable extends DataSource<Checkbook> {

  // tslint:disable-next-line: variable-name
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Checkbook[] = [];
  renderedData: Checkbook[] = [];

  constructor(public transactionService: TransactionService,
              // tslint:disable-next-line: variable-name
              public _paginator: MatPaginator,
              // tslint:disable-next-line: variable-name
              public _sort: MatSort,
              private userId: number) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Checkbook[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.transactionService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];


    this.transactionService.getTransactionsAndAccountInfoIntoTemp(this.userId);

    return merge(...displayDataChanges).pipe(map(() => {
      // Filter data
      this.filteredData = this.transactionService.data.slice().filter((checkbook: Checkbook) => {
        const searchStr = (checkbook.amount + checkbook.memo + checkbook.transactionDt).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() { }

  sortData(data: Checkbook[]): Checkbook[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'date': [propertyA, propertyB] = [a.transactionDt, b.transactionDt]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
