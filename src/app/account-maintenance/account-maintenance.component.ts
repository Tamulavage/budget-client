import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { Accounttype } from '../accounttype';

const resetInitialBalance = 0.00;
const resetInitialAccountType = 'Account Type';

@Component({
  selector: 'app-account-maintenance',
  templateUrl: './account-maintenance.component.html',
  styleUrls: ['./account-maintenance.component.css']
})
export class AccountMaintenanceComponent implements OnInit {

  @Input() user: number;
  InitialBalance: number;

  accounts: Account[];

  accountTypes: Accounttype[];
  selectedAccountType: Accounttype;
  accountTypeName: string;
  accountTypeId: number;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.resetInitialFields();
    this.accountService.getAccountTypes().subscribe(accountType => this.accountTypes = accountType);
  }

  newAccountButton(): void {
    (document.getElementById('newAccountDiv') as HTMLInputElement).hidden = false;
    (document.getElementById('mainMaintenance') as HTMLInputElement).hidden = true;
    (document.getElementById('verify') as HTMLInputElement).hidden = false;
  }

  delete(): void {
    // TODO: Need to add
  }

  createAccount(institutionName: string, name: string, balance: number, nickname: string): void {

    console.log('starting createAccount');
    if (!this.validDeposit(name, balance)) {
      return;
    }

    const userId = this.user;
    const accountTypeId = this.accountTypeId;

    this.accountService.addAccount({ name, balance, accountTypeId, userId, nickname, institutionName } as Account)
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

    this.accountTypeName = resetInitialAccountType;
    this.accountTypeId = null;
    this.selectedAccountType = null;
  }

  onSelectAccountType(accountType: Accounttype) {
    this.selectedAccountType = accountType;
    this.accountTypeName = this.selectedAccountType.description;
    this.accountTypeId = this.selectedAccountType.id;
}

  cancel(): void {
    this.resetInitialFields();

    (document.getElementById('newAccountDiv') as HTMLInputElement).hidden = true;
    (document.getElementById('mainMaintenance') as HTMLInputElement).hidden = false;
    (document.getElementById('verify') as HTMLInputElement).hidden = true;
  }

  private validDeposit(name: string, balance: number) {
    console.log('starting validation');
    if (!this.user) {
      console.log('Null User Id');
      return false;
    }
    if (!name) {
      console.log('invalid name');
      return false;
    }
    if (!balance || balance < 0) {
      console.log('invalid initial balance');
      return false;
    }
    if (!this.accountTypeId) {
      console.log('invalid Account Type');
      return false;
    }
    // TODO: add more validation here
    return true;
  }

}
