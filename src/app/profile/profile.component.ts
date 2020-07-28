import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthorizeService } from '../services/authorize.service';
import { AuthorizedUser } from '../models/authorizedUser';
import { Authenticate } from '../models/authenticate';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  showNewUserWindow: boolean;

  authorizedUsers = new BehaviorSubject<AuthorizedUser> (null);
  nickname: string;
  authenticate: Authenticate[] = [];
  profileJson: string = null;
  userId: number;

  showAccount: boolean;
  showBudget: boolean;
  showCheckbook: boolean;
  showGraph: boolean;

  constructor(
      public auth: AuthService,
      public authorize: AuthorizeService,
      public dialog: MatDialog) { }

  ngOnInit() {

    let temp = JSON.parse(this.profileJson);

    this.showAccount = true;
    this.showBudget = false;
    this.showCheckbook = false;
    this.showGraph = true;

    this.showNewUserWindow = false;

    if (this.auth.loggedIn) {
      this.auth.userProfile$.subscribe((user: any[]) => {
        this.profileJson = JSON.stringify(user, null, 2);
        temp = JSON.parse(this.profileJson);
        this.nickname = temp.nickname;
        }
      );

      this.getAuthorizedUser();
    }
  }


  getAuthorizedUser() {
    this.authorize.getAuthorizeUser(this.nickname).subscribe((data) => {
      if (data.status === 200) {
        const user = data.body;
        this.authorizedUsers.next(user);
        this.userId = user.id;
      } else if (data.status === 204 ) {
        this.showNewUserWindow  = true;
      } else {
        this.auth.loggedIn = false;
      }
     });
  }

  newUserAccount() {
    const userName = this.nickname;
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: { userName }
    });

    dialogRef.afterClosed().subscribe(  x => {
      if (x === 1) {
        this.authorizedUsers.next(this.authorize.getDialogData());
        const temp = this.authorize.getDialogData();
        this.userId = temp.id;
        this.authorizedUsers.complete();
      }
    }
    );
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
      this.showAccount = false;
      this.showGraph = false;
      this.showCheckbook = false;
    }
  }

  toggleCheckbook() {
    if ( this.showCheckbook) {
      this.showCheckbook = false;
      this.showAccount = true;
      this.showGraph = true;
    } else {
      this.showCheckbook = true;
      this.showAccount = false;
      this.showGraph = false;
      this.showBudget = false;
    }
  }

  toggleGraphs() {
    if ( this.showGraph) {
      this.showGraph = false;
    } else {
      this.showGraph = true;
      this.showCheckbook = false;
    }
  }

}
