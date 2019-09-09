import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthorizeService } from '../authorize.service';
import { AuthorizedUser } from '../authorizedUser';
import { Authenticate } from '../authenticate';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  authorizedUser: AuthorizedUser[] = [];
  nickname: string;
  authenticate: Authenticate[] = [];
  profileJson: string = null;

  constructor(public auth: AuthService,
              public authorize: AuthorizeService) { }

  ngOnInit() {
    // this.auth.userProfile$.subscribe(user =>
    //   this.profileJson = JSON.stringify(user, null, 2)
    // );

    let temp = JSON.parse(this.profileJson);
    let timedOutCount = 0;

    this.auth.userProfile$.subscribe((user: any[]) => {
      this.profileJson = JSON.stringify(user, null, 2);
      // console.log(this.profileJson);
      temp = JSON.parse(this.profileJson);
    }
    );

    while (timedOutCount < 500) {
      if (temp) {
        timedOutCount = 1001;
        // console.log('username: ' , temp.nickname);
        this.nickname = temp.nickname;
        this.getAuthorizedUser();
      } else {
        timedOutCount++;
      }
    }

  }

  getAuthorizedUser(): void {
    this.authorize.getAuthorizedUser(this.nickname).subscribe((user: any[]) => {
      this.authorizedUser = user;
      // console.log(user);
    });
  }

}
