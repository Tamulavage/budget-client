import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountsComponent } from './accounts/accounts.component';
import { TansactionHistoryComponent } from './tansaction-history/tansaction-history.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountMaintenanceComponent } from './account-maintenance/account-maintenance.component';
import { BudgetMatrixComponent } from './budget-matrix/budget-matrix.component';
import { BudgetMatrixMaintenanceComponent } from './budget-matrix-maintenance/budget-matrix-maintenance.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CallbackComponent,
    ProfileComponent,
    AccountsComponent,
    TansactionHistoryComponent,
    TransactionComponent,
    AccountMaintenanceComponent,
    BudgetMatrixComponent,
    BudgetMatrixMaintenanceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
