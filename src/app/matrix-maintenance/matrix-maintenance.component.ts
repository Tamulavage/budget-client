import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { BudgetMatrixService } from '../services/budget-matrix.service';
import { BudgetMatrix } from '../models/budgetMatrix';
import { MaintenanceSetting } from '../models/maintenanceSetting';

@Component({
  selector: 'app-matrix-maintenance',
  templateUrl: './matrix-maintenance.component.html',
  styleUrls: ['./matrix-maintenance.component.css']
})
export class MatrixMaintenanceComponent {
  showRemove = false;
  profileId: number;

  constructor(public dialogRef: MatDialogRef<MatrixMaintenanceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BudgetMatrix,
              @Inject(MAT_DIALOG_DATA) public budgetMaintenanceSetting: MaintenanceSetting,
              private budgetMatrixService: BudgetMatrixService) {

    this.showRemove = budgetMaintenanceSetting.showRemoved;
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
    this.budgetMatrixService.addNewLineItemByUserID(this.profileId, this.data).subscribe();
  }

  public confirmDelete(): void {
    this.budgetMatrixService.removeLineItemByUserID(this.profileId, this.data).subscribe();
  }

}
