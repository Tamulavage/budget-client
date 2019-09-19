import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthorizeService } from '../authorize.service';
import { AuthorizedUser } from '../authorizedUser';
import { Authenticate } from '../authenticate';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  authorizedUsers: AuthorizedUser[] = [];
  nickname: string;
  authenticate: Authenticate[] = [];
  profileJson: string = null;
  id: number[];

  constructor(
      public auth: AuthService,
      public authorize: AuthorizeService) { }

  ngOnInit() {

    let temp = JSON.parse(this.profileJson);
    let timedOutCount = 0;

    this.auth.userProfile$.subscribe((user: any[]) => {
      this.profileJson = JSON.stringify(user, null, 2);
      temp = JSON.parse(this.profileJson);
    }
   );

    while (timedOutCount < 500) {
      if (temp) {
        timedOutCount = 1001;
        this.nickname = temp.nickname;
        this.nickname = 'tamulavage';
        this.getAuthorizedUser();
        // console.log(this.id);
      } else {
        timedOutCount++;
      }
    }
  }

  // getAuthorizedUsers(): void {
  //   this.authorize.getAuthorizeUser(this.nickname).subscribe((user: AuthorizedUser[]) => {
  //    this.authorizedUsers = user;
  //    console.log(this.authorizedUsers);
  //   });
  // }

  getAuthorizedUser() {
    let temp2 = JSON.parse(this.profileJson);
    let str = '';
    this.authorize.getAuthorizeUser(this.nickname).subscribe((user: AuthorizedUser[]) => {
     this.authorizedUsers = user;
    //  console.log(this.authorizedUsers);
     console.log(user);
     str = JSON.stringify(user, null, 2);
     temp2 = JSON.parse(str);
    });
    console.log(temp2);
  }

}
