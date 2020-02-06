import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BudgetMatrix } from 'src/app/models/budgetMatrix';
import { MaintenanceSetting } from 'src/app/models/maintenanceSetting';
import { BudgetMatrixService } from 'src/app/services/budget-matrix.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inline-budget-edit',
  templateUrl: './inline-budget-edit.component.html',
  styleUrls: ['./inline-budget-edit.component.css']
})
export class InlineBudgetEditComponent {
  profileId: number;

  constructor(public dialogRef: MatDialogRef<InlineBudgetEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BudgetMatrix,
              @Inject(MAT_DIALOG_DATA) public budgetMaintenanceSetting: MaintenanceSetting,
              private budgetMatrixService: BudgetMatrixService) {

    this.profileId = budgetMaintenanceSetting.userId;
  }

  formControl = new FormControl('', [
    Validators.required
  ]);

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.budgetMatrixService.updateCurrencyAmount(this.profileId, this.data).subscribe();
  }
}
