import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { AuthorizedUser } from './authorizedUser';

const   httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/jspn' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  private userUrl = 'http://localhost:8080/budget/profile';

  constructor(private http: HttpClient) { }

  getAuthorizedUser(username: string): Observable<AuthorizedUser[]> {
    const url = `${this.userUrl}/find/${username}`;
    console.log(url);
    console.log(this.http.get<AuthorizedUser[]>(url));
    return this.http.get<AuthorizedUser[]>(url)
      .pipe(
        tap(_ => console.log('User Data', _))
        // ,
        // catchError(this.handleError<AuthorizedUser[]>('Authorized', []))
       )
      ;
  }
}
