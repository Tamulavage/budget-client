import { Component, OnInit, Input } from '@angular/core';
import {AccountService} from '../account.service';
import {Account} from '../account';
import { AuthorizedUser } from '../authorizedUser';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  // @Input() user: string;
  @Input() user: number;
  userid: number;
  accounts: Account[];
  account: Account;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts(): void {
    console.log('user id', this.user);
    // console.log(this.user.shift());
    this.accountService.getAccounts(this.user).subscribe(accounts => this.accounts = accounts);
 }
}
