import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const   httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  
  // private userUrl = 'http://localhost:8080/budget';
  private userUrl = 'https://budgetappserver.herokuapp.com/budget';

  constructor(private http: HttpClient) { }

  resetValues(userId: number): Observable<HttpResponse<string>> {
    const url = `${this.userUrl}/reset/${userId}`;
    return this.http.post<any> (url, userId,  httpOptions);
   }

  resetToDemo(userId: number): Observable<HttpResponse<string>> {
    const url = `${this.userUrl}/reset_demo/${userId}`;

    return this.http.post<any> (url, userId,  httpOptions);
  }
}
