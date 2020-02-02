import { Injectable } from '@angular/core';
import { BudgetMatrix } from '../models/budgetMatrix';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { BudgetOrg } from '../models/budgetOrg';
import { tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const httpFullOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  observe: `response`
};

@Injectable({
  providedIn: 'root'
})
export class BudgetMatrixService {

  constructor(private http: HttpClient) { }

  private baseURI = 'http://localhost:8080/budget/';
  // private baseURI = 'https://budgetappserver.herokuapp.com/budget/';
  private futureUrl = `${this.baseURI}future`;

  dialogData: any;

  getFutureOutputBudgetByUserID(userId: number): Observable<BudgetMatrix[]> {
    const url = `${this.futureUrl}/output/${userId}`;
    // console.log(url);
    return this.http.get<BudgetMatrix[]>(url)
    .pipe(
      //  tap(_ => console.log('Data', _))
    );
  }

  getFutureInputBudgetByUserID(userId: number): Observable<BudgetMatrix[]> {
    const url = `${this.futureUrl}/input/${userId}`;
    // console.log(url);
    return this.http.get<BudgetMatrix[]>(url)
    .pipe(
    );
  }

  getFutureSumsBudgetByUserID(userId: number): Observable<BudgetMatrix[]> {
    const url = `${this.futureUrl}/sums/${userId}`;
    // console.log(url);
    const response = this.http.get<BudgetMatrix[]>(url);
    response
    .pipe(
      catchError(this.handleError<BudgetMatrix>('getFutureSumsBudgetByUserID'))
    );

    return response;
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable <T> => {
      console.log(`Handle this error:  ${error.message}`);
      return of(result as T);
    };
  }

  handleUserError(error: HttpErrorResponse) {
      alert('Your Current Month total > 0 !');
      return throwError('User\'s sum for current month > 0');
  }

  getDialogData() {
    return this.dialogData;
  }

  addNewLineItemByUserID(userId: number, lineItem: BudgetMatrix): Observable<BudgetMatrix[]> {
    this.dialogData = lineItem;
    const url = `${this.futureUrl}/lineitem/${userId}`;
    // console.log(url);
    // console.log(lineItem);
    return this.http.post<BudgetMatrix[]>(url, lineItem, httpOptions);
  }

  removeLineItemByUserID(userId: number, lineItem: BudgetMatrix): Observable<BudgetMatrix[]> {
    const url = `${this.futureUrl}/lineitem/${userId}`;

    const httpOptionsForDelete = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body:  lineItem
    };
    console.log(url);
    return this.http.delete<BudgetMatrix[]>(url, httpOptionsForDelete);
  }

  completCurrentMonth(userId: number, forceCompelte: boolean): Observable<HttpResponse<BudgetOrg[]>> {
    const url = `${this.futureUrl}/completemonth/${userId}?forceComplete=${forceCompelte}`;
    console.log(url);
    return this.http.post<BudgetOrg[]>(url, null, {observe: `response`})
      .pipe(
          catchError(this.handleUserError)
        );
  }

}
