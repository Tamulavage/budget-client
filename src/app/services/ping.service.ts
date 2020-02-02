import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  private url = 'http://localhost:8080/budget';
  // private url = 'https://budgetappserver.herokuapp.com/budget';

  constructor(private http: HttpClient) { }

  pingServer(): Observable<HttpResponse<string>> {
    const url = `${this.url}/ping`;
    console.log(url);
    return this.http.get<string>(url, { observe: 'response' })
    .pipe(
       tap(_ => console.log( _.body))
    );
  }
}
