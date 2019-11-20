import { Injectable } from '@angular/core';
import { Account } from './models/account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Accounttype} from './models/accounttype';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUri = 'http://localhost:8080/budget/';

  private accountUrl = `${this.baseUri}account`;

  constructor(private http: HttpClient) { }

  getAccounts(userId: number): Observable<Account[]> {
    // Should this stil be the path?
    const url = `${this.accountUrl}/?userId=${userId}`;
    return this.http.get<Account[]>(url)
      .pipe(
      );
  }

  addAccount(account: Account, userId: number): Observable<Account[]> {
    const url = `${this.accountUrl}/?userId=${userId}`;
    return this.http.post<Account[]>(url, account, httpOptions)
      .pipe(
        // tap((newAccount: Account) => this.log(`added account`)),
        // catchError(this.handleError<Account>('addAccount'))
      );
  }

  deleteAccount(account: Account): Observable<Account[]> {
    const url = `${this.accountUrl}/inactive`;
    return this.http.post<Account[]>(url, account, httpOptions)
      .pipe(
        // tap((newAccount: Account) => this.log(`added account`)),
        // catchError(this.handleError<Account>('addAccount'))
      );
  }

  getAccountTypes(): Observable<Accounttype[]> {
    const url = `${this.baseUri}/accounttype`;
    return this.http.get<Accounttype[]>(url);
}
}
