import { Injectable } from '@angular/core';
import { BudgetMatrix } from './budgetMatrix';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BudgetMatrixService {

  constructor(private http: HttpClient) { }

  private baseURI = 'http://localhost:8080/budget/';
  private futureUrl = `${this.baseURI}future`;

  getFutureOutputBudgetByUserID(userId: number): Observable<BudgetMatrix[]> {
    const url = `${this.futureUrl}/output/${userId}`;
    console.log(url);
    return this.http.get<BudgetMatrix[]>(url)
    .pipe(
      //  tap(_ => console.log('Data', _))
    );
  }

  getFutureInputBudgetByUserID(userId: number): Observable<BudgetMatrix[]> {
    const url = `${this.futureUrl}/input/${userId}`;
    console.log(url);
    return this.http.get<BudgetMatrix[]>(url)
    .pipe(
      //  tap(_ => console.log('Data', _))
    );
  }

  getFutureSumsBudgetByUserID(userId: number): Observable<BudgetMatrix[]> {
    const url = `${this.futureUrl}/sums/${userId}`;
    console.log(url);
    return this.http.get<BudgetMatrix[]>(url)
    .pipe(
      //  tap(_ => console.log('Data', _))
    );
  }

}
