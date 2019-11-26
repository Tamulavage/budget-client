import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Transaction} from '../models/transaction';
import {Observable, of} from 'rxjs';
import {Account} from '../models/account';
import { TransactionAccount } from '../models/transactionAccount';
import { Checkbook } from '../models/checkbook';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {}

  // private baseURI = 'http://localhost:8080/budget/';
  private baseURI = 'https://budgetappserver.herokuapp.com/budget/';
  private transactionUrl = `${this.baseURI}transaction/`;
  private transactionsUrl = `${this.baseURI}transactions/`;
  private accountUrl = `${this.baseURI}account`;

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

  getAccountByUserID(userId: number): Observable<Account[]> {
    const url = `${this.accountUrl}/?userId=${userId}`;
    return this.http.get<Account[]>(url);
  }

  addTransaction(transaction: Transaction) {
    // console.log(transaction);
    return this.http.post<Transaction>(this.transactionUrl, transaction, httpOptions);
  }

}
