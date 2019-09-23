import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Transaction} from './transaction';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) {}

  private baseURI = 'http://localhost:8080/budget/';
  private transactionUrl = `${this.baseURI}transaction/`;

  getLatestTransactionsByUser(userId: number): Observable<Transaction[]> {
    const url = `${this.transactionUrl}${userId}`;
    console.log(url);
    return this.http.get<Transaction[]>(url);
  }


}
