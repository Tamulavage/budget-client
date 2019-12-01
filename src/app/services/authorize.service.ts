import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { AuthorizedUser } from '../models/authorizedUser';

const   httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/jspn' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  // private userUrl = 'http://localhost:8080/budget/profile';
  private userUrl = 'https://budgetappserver.herokuapp.com/budget/profile';

  constructor(private http: HttpClient) { }


  getAuthorizeUser(username: string): Observable<AuthorizedUser> {
    const url = `${this.userUrl}/find/${username}`;
    return this.http.get<AuthorizedUser>(url)
      .pipe(
        // tap(_ => console.log(_))
       )
      ;
  }
}
