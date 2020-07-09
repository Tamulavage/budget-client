import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Transaction} from '../models/transaction';
import {Observable,  BehaviorSubject, of, throwError} from 'rxjs';
import {Account} from '../models/account';
import { TransactionAccount } from '../models/transactionAccount';
import { Checkbook } from '../models/checkbook';
import { catchError } from 'rxjs/internal/operators/catchError';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  dataChange: BehaviorSubject<Checkbook[]> = new BehaviorSubject<Checkbook[]>([]);
  dialogData: any;

  constructor(private http: HttpClient) {}

  // private baseURI = 'http://localhost:8080/budget/';
  private baseURI = 'https://budgetappserver.herokuapp.com/budget/';

  private transactionUrl = `${this.baseURI}transaction/`;
  private transactionsUrl = `${this.baseURI}transactions/`;
  private accountUrl = `${this.baseURI}account`;

  get data(): Checkbook[] {
    return this.dataChange.value;
  }

  getLatestTransactionsByUser(userId: number): Observable<Transaction[]> {
    const url = `${this.transactionUrl}${userId}`;
    // console.log(url);
    return this.http.get<Transaction[]>(url);
  }

  getTransactionsByUser(userId: number): Observable<TransactionAccount[]> {
    const url = `${this.transactionUrl}${userId}`;
    // console.log(url);
    return this.http.get<TransactionAccount[]>(url);
  }

  getTransactionsAndAccountInfo(userId: number): Observable<Checkbook[]> {
    const url = `${this.transactionsUrl}${userId}`;
    // console.log(url);
    return this.http.get<Checkbook[]>(url);
  }

  getTransactionsAndAccountInfoIntoTemp(userId: number): void {
    const url = `${this.transactionsUrl}${userId}`;
    // console.log(url);
    this.http.get<Checkbook[]>(url).subscribe(data => {
      this.dataChange.next(data);
      });
  }

  getAccountByUserID(userId: number): Observable<Account[]> {
    const url = `${this.accountUrl}/?userId=${userId}`;
    return this.http.get<Account[]>(url);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable <T> => {
      if (error.status === 400) {
        alert('Data error - please ensure data is correct');
      } else {
        alert('Unkown Error saving data - please try again');
      }
      console.log(`Error:  ${error.message}`);
      return of(result as T);
    };
  }

  addTransaction(transaction: Transaction, fromAccountName: string, toAccountName: string) {
    // console.log(transaction);
    this.cacheTranscationData(transaction, fromAccountName, toAccountName);
    return this.http.post<Transaction>(this.transactionUrl, transaction, httpOptions)
    .pipe(
      catchError(this.handleError<any>('Add Transaction'))
    );
  }

  cacheTranscationData(transaction: Transaction, fromAccountName: string, toAccountName: string) {
    const transactionAccount: TransactionAccount = new TransactionAccount();
    transactionAccount.amount = transaction.amount;
    transactionAccount.fromAccountId = transaction.fromAccountId;
    transactionAccount.fromAccountName = fromAccountName;
    transactionAccount.toAccountId = transaction.toAccountId;
    transactionAccount.toAccountName = toAccountName;
    transactionAccount.memo = transaction.memo;
    transactionAccount.transactionDt = transaction.transactionDt;
    this.dialogData = transactionAccount;
  }

  getDialogData() {
    return this.dialogData;
  }

  updateTransaction(transaction: Transaction, fromAccountName: string, toAccountName: string){
    this.cacheTranscationData(transaction, fromAccountName, toAccountName);
    return this.http.post<Transaction>(this.transactionUrl, transaction, httpOptions)
    .pipe(
      catchError(this.handleError<any>('Update Transaction'))
    );
  }

}
