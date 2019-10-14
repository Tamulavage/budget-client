import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../account.service';
import {Account} from '../account';

const resetInitialBalance = 0.00;

@Component({
  selector: 'app-account-maintenance',
  templateUrl: './account-maintenance.component.html',
  styleUrls: ['./account-maintenance.component.css']
})
export class AccountMaintenanceComponent implements OnInit {

  @Input() user: number;
  InitialBalance: number;

  accounts: Account[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.resetInitialFields();
  }

  newAccountButton(): void {
    (document.getElementById('newAccountDiv') as HTMLInputElement).hidden = false;
    (document.getElementById('mainMaintenance') as HTMLInputElement).hidden = true;
    (document.getElementById('verify') as HTMLInputElement).hidden = false;
  }

  delete(): void {
    // TODO: Need to add
  }

  createAccount(institutionName: string, name: string, balance: number, nickname: string, accountType: string): void {

    console.log('starting createAccount');
    if (!this.validDeposit(name, balance)) {
      return;
    }

    const userId = this.user;

    // TODO: Change Account type to pull from service
    const accountTypeId = 2;

    this.accountService.addAccount({ name, balance, accountTypeId, userId, nickname , institutionName}  as Account)
        .subscribe(
            // TODO: push new account to parent obeject
        );

    (document.getElementById('newAccountDiv') as HTMLInputElement).hidden = true;
    (document.getElementById('mainMaintenance') as HTMLInputElement).hidden = false;
    (document.getElementById('verify') as HTMLInputElement).hidden = true;

    this.resetInitialFields();
  }

  resetInitialFields(): void {
    this.InitialBalance = resetInitialBalance;
  }

  cancel(): void {
    (document.getElementById('newAccountDiv') as HTMLInputElement).hidden = true;
    (document.getElementById('mainMaintenance') as HTMLInputElement).hidden = false;
    (document.getElementById('verify') as HTMLInputElement).hidden = true;
  }

  private validDeposit(name: string, balance: number) {
    console.log('starting validation');
    if (!name) {
      console.log('invalid name');
      return false;
    }
    if (!balance || balance < 0) {
      console.log('invalid initial balance');
      return false;
    }
    // TODO: add more validation here
    return true;
  }

}
