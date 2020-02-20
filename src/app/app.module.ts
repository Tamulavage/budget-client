import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ChartsModule } from 'ng2-charts';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountsComponent } from './account/accounts/accounts.component';
import { TansactionHistoryComponent } from './transaction/tansaction-history/tansaction-history.component';
import { AccountMaintenanceComponent } from './account/account-maintenance/account-maintenance.component';
import { BudgetMatrixComponent } from './budgetMatrix/budget-matrix/budget-matrix.component';
import { MatrixMaintenanceComponent } from './budgetMatrix/matrix-maintenance/matrix-maintenance.component';
import { TransactionAddComponent } from './transaction/transaction-add/transaction-add.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TransactionService } from './services/transaction.service';
import { CheckbookGraphComponent } from './checkbook-graph/checkbook-graph.component';
import { InlineBudgetEditComponent } from './budgetMatrix/inline-budget-edit/inline-budget-edit.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';



@NgModule({
  exports: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    CallbackComponent,
    ProfileComponent,
    AccountsComponent,
    TansactionHistoryComponent,
    AccountMaintenanceComponent,
    BudgetMatrixComponent,
    MatrixMaintenanceComponent,
    TransactionAddComponent,
    EditUserComponent,
    CheckbookGraphComponent,
    InlineBudgetEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatDialogModule,
    ChartsModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSortModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    MatrixMaintenanceComponent,
    TransactionAddComponent,
    EditUserComponent,
    InlineBudgetEditComponent
  ],
  providers: [TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
