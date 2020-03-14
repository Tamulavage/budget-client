import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {retryWhen, delay, take,} from 'rxjs/operators';
import { AuthorizedUser } from '../models/authorizedUser';

const   httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  // private userUrl = 'http://localhost:8080/budget/profile';
  private userUrl = 'https://budgetappserver.herokuapp.com/budget/profile';

  dialogData: any;
  errorLogingIn = false;

  constructor(private http: HttpClient) { }


  getAuthorizeUser(username: string): Observable<HttpResponse<AuthorizedUser>> {
    const url = `${this.userUrl}/find/${username}`;
    return this.http.get<AuthorizedUser>(url, { observe: 'response' })
    .pipe(
      retryWhen(err => err.pipe(
          delay(1000),
          take(5)
          ))
    );
   }

  addAuthorizeUser(authorizedUser: AuthorizedUser): Observable<AuthorizedUser> {
    // console.log(authorizedUser);
    this.dialogData = authorizedUser;
    const url = `${this.userUrl}/`;
    const temp = this.http.post<AuthorizedUser>(url, authorizedUser, httpOptions);
    temp.subscribe(data => this.dialogData.id = data.id);

    return temp;
  }

  getDialogData() {
      return this.dialogData;
  }

}
