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
  changeAmount: number;

  constructor(public dialogRef: MatDialogRef<InlineBudgetEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BudgetMatrix,
              @Inject(MAT_DIALOG_DATA) public budgetMaintenanceSetting: MaintenanceSetting,
              private budgetMatrixService: BudgetMatrixService) {

    this.profileId = budgetMaintenanceSetting.userId;
    this.getChangeAmmount();
  }

  formControl = new FormControl('', [
    Validators.required
  ]);


  getChangeAmmount(): void {
    const month = this.data.currentMonth;
    switch (month) {
      case 1: {
        this.changeAmount = this.data.januaryAmount;
        break;
      }
      case 2: {
        this.changeAmount = this.data.februaryAmount;
        break;
      }
      case 3: {
        this.changeAmount = this.data.marchAmount;
        break;
      }
      case 4: {
        this.changeAmount = this.data.aprilAmount;
        break;
      }
      case 5: {
        this.changeAmount = this.data.mayAmount;
        break;
      }
      case 6: {
        this.changeAmount = this.data.juneAmount;
        break;
      }
      case 7: {
        this.changeAmount = this.data.julyAmount;
        break;
      }
      case 8: {
        this.changeAmount = this.data.augustAmount;
        break;
      }
      case 9: {
        this.changeAmount = this.data.septemberAmount;
        break;
      }
      case 10: {
        this.changeAmount = this.data.octoberAmount;
        break;
      }
      case 11: {
        this.changeAmount = this.data.novemberAmount;
        break;
      }
      case 12: {
        this.changeAmount = this.data.decemberAmount;
        break;
      }
      default: {
        this.changeAmount = this.data.currentAmount;
      }
    }
  }

  updateChangeAmountDTO(): void {
    const month = this.data.currentMonth;
    switch (month) {
      case 1: {
        this.data.januaryAmount = this.changeAmount;
        break;
      }
      case 2: {
        this.data.februaryAmount = this.changeAmount;
        break;
      }
      case 3: {
        this.data.marchAmount = this.changeAmount;
        break;
      }
      case 4: {
        this.data.aprilAmount = this.changeAmount;
        break;
      }
      case 5: {
        this.data.mayAmount = this.changeAmount;
        break;
      }
      case 6: {
        this.data.juneAmount = this.changeAmount;
        break;
      }
      case 7: {
        this.data.julyAmount = this.changeAmount;
        break;
      }
      case 8: {
        this.data.augustAmount = this.changeAmount;
        break;
      }
      case 9: {
        this.data.septemberAmount = this.changeAmount;
        break;
      }
      case 10: {
        this.data.octoberAmount = this.changeAmount;
        break;
      }
      case 11: {
        this.data.novemberAmount = this.changeAmount;
        break;
      }
      case 12: {
        this.data.decemberAmount = this.changeAmount;
        break;
      }
      default: {
        this.data.currentAmount = this.changeAmount;
        break;
      }
    }
  }

  submit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.updateChangeAmountDTO();
    this.budgetMatrixService.updateCurrenctAmount(this.profileId, this.data, this.changeAmount).subscribe();
  }

}
