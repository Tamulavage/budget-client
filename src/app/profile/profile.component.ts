import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthorizeService } from '../authorize.service';
import { AuthorizedUser } from '../models/authorizedUser';
import { Authenticate } from '../models/authenticate';
// import { from, of, Observable, BehaviorSubject, combineLatest, throwError, Subject } from 'rxjs';
// import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

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

  showAccount: boolean;
  showBudget: boolean;
  showTranscation: boolean;
  showCheckbook: boolean;

  constructor(
      public auth: AuthService,
      public authorize: AuthorizeService) { }

  ngOnInit() {

    let temp = JSON.parse(this.profileJson);
    let timedOutCount = 0;

    this.showAccount = true;
    this.showBudget = true;
    this.showTranscation = false;
    this.showCheckbook = false;
    this.auth.userProfile$.subscribe((user: any[]) => {
      this.profileJson = JSON.stringify(user, null, 2);
      temp = JSON.parse(this.profileJson);
    }
   );

   // TODO: revist this section
    while (timedOutCount < 500) {
      if (temp) {
        timedOutCount = 1001;
        this.nickname = temp.nickname;
        this.getAuthorizedUser();
      } else {
        timedOutCount++;
      }
    }
  }

  getAuthorizedUser() {
    // let temp2 = JSON.parse(this.profileJson);
    // let str = '';
    this.authorize.getAuthorizeUser(this.nickname).subscribe((user: AuthorizedUser[]) => {
     this.authorizedUsers = user;
    //  str = JSON.stringify(user, null, 2);
    //  temp2 = JSON.parse(str);
    });
  }

  toggleAccount() {
    if ( this.showAccount) {
      this.showAccount = false;
    } else {
      this.showAccount = true;
    }
  }

  toggleBudget() {
    if ( this.showBudget) {
      this.showBudget = false;
    } else {
      this.showBudget = true;
    }
  }

  toggleTransction() {
    if ( this.showTranscation) {
      this.showTranscation = false;
    } else {
      this.showTranscation = true;
    }
  }

  toggleCheckbook() {
    if ( this.showCheckbook) {
      this.showCheckbook = false;
    } else {
      this.showCheckbook = true;
    }
  }

}
