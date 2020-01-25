import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthorizeService } from '../services/authorize.service';
import { AuthorizedUser } from '../models/authorizedUser';
import { Authenticate } from '../models/authenticate';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
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

  constructor(
      public auth: AuthService,
      public authorize: AuthorizeService,
      public dialog: MatDialog) { }

  ngOnInit() {

    let temp = JSON.parse(this.profileJson);

    this.showAccount = false;
    this.showBudget = true;
    this.showCheckbook = false;

    this.showNewUserWindow = false;

    this.auth.userProfile$.subscribe((user: any[]) => {
      this.profileJson = JSON.stringify(user, null, 2);
      temp = JSON.parse(this.profileJson);
      this.nickname = temp.nickname;
    }
   );

    this.getAuthorizedUser();
  }

  getAuthorizedUser() {
    this.authorize.getAuthorizeUser(this.nickname).subscribe((data) => {
      if (data.status === 200) {
        const user = data.body;
        this.authorizedUsers.next(user);
        this.userId = user.id;
      } else if (data.status === 204 ) {
        this.showNewUserWindow  = true;
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
