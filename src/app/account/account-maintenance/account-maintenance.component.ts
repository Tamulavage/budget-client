import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account';
import { Accounttype } from '../../models/accounttype';

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

  showMainMaintenance: boolean;
  showAddNewAccount: boolean;
  showNewAccountActionItems: boolean;
  showRemoveAccountActionItems: boolean;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.resetInitialFields();
  }

  newAccountButton(): void {
    this.accountService.getAccountTypes().subscribe(accountType => this.accountTypes = accountType);

    this.showMainMaintenance = false;
    this.showAddNewAccount = true;
    this.showNewAccountActionItems = true;
  }

  delete(): void {
    this.showRemoveAccountActionItems = true;
    this.showMainMaintenance = false;

    this.accountService.getAccounts(this.user).subscribe(accounts => this.accounts = accounts);
  }

  createAccount(institutionName: string, balance: number, nickname: string): void {

    if (!this.validDeposit(nickname, balance)) {
      return;
    }

    const userId = this.user;
    const accountTypeId = this.accountTypeId;

    this.accountService.addAccount({ balance, accountTypeId, nickname, institutionName } as Account, userId)
      .subscribe(
        // TODO: push new account to parent obeject
      );

    this.resetInitialFields();
  }

  resetInitialFields(): void {
    this.InitialBalance = resetInitialBalance;

    this.accountTypeName = resetInitialAccountType;
    this.accountTypeId = null;
    this.selectedAccountType = null;
    this.accounts = [];

    this.showAddNewAccount = false;
    this.showMainMaintenance = true;
    this.showRemoveAccountActionItems = false;
    this.showNewAccountActionItems = false;

    this.resetAccountType();
  }

  resetAccountType() {
    this.selectedAccountType = new Accounttype();
    this.selectedAccountType.id = 0;
    this.accountTypeName = resetInitialAccountType;
    this.accountTypeId = null;
  }

  onSelectAccountType(accountType: Accounttype) {
    this.selectedAccountType = accountType;
    this.accountTypeName = this.selectedAccountType.description;
    this.accountTypeId = this.selectedAccountType.id;
  }

  cancel(): void {
    this.resetInitialFields();
  }

  getAccounts(): void {
    this.accountService.getAccounts(this.user).subscribe(accounts => this.accounts = accounts);
  }

  deleteAccount(account: Account) {
    const tempid = account.id;
    this.accountService.deleteAccount(account).subscribe();
    const index = this.accounts.findIndex(item => item.id === tempid);
    this.accounts.splice(index, 1);
  }

  private validDeposit(nickname: string, balance: number) {
    console.log('starting validation');
    if (!this.user) {
      console.log('Null User Id');
      return false;
    }
    if (!nickname) {
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
