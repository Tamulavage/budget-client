import { Injectable } from '@angular/core';
import {Account} from './account';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUri = 'http://localhost:8080/budget/';

  private accountUrl = `${this.baseUri}/account`;

  constructor(private http: HttpClient) { }

  getAccounts(userId: number): Observable<Account[]> {
    // Should this stil be the path?
    const url = `${this.accountUrl}/?userId=${userId}`;
    return this.http.get<Account[]>(url)
    .pipe(
      //  tap(_ => console.log('Data', _))
     );
  }
}
