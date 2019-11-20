import { Component, OnInit, Input, Output } from '@angular/core';
import {AccountService} from '../services/account.service';
import {Account} from '../models/account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  @Input() user: number;
  selectedUser: number;
  accounts: Account[];
  account: Account;
  showMaintenance: boolean;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getAccounts();
    this.showMaintenance = false;
  }

  getAccounts(): void {
    this.accountService.getAccounts(this.user).subscribe(accounts => this.accounts = accounts);
 }

 toggleMaintenaces() {
   if ( this.showMaintenance) {
     this.showMaintenance = false;
     this.getAccounts();
   } else {
     this.showMaintenance = true;
   }
 }

}
