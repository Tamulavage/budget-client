import { Component, OnInit, Input, Output } from '@angular/core';

import { BudgetMatrix } from '../../models/budgetMatrix';
import { BudgetMatrixService } from '../../services/budget-matrix.service';
import { MatDialog } from '@angular/material/dialog';
import { MatrixMaintenanceComponent } from '../matrix-maintenance/matrix-maintenance.component';

@Component({
  selector: 'app-budget-matrix',
  templateUrl: './budget-matrix.component.html',
  styleUrls: ['./budget-matrix.component.css']
})
export class BudgetMatrixComponent implements OnInit {
  @Input() user: number;
  @Output() userId: number;

  showMaintenceColumn = false;
  coded = false;

  displayedColumns: string[] = ['orgName', 'currentAmount', 'januaryAmount', 'februaryAmount', 'marchAmount', 'aprilAmount',
     'mayAmount', 'juneAmount' , 'julyAmount', 'augustAmount', 'septemberAmount', 'octoberAmount', 'novemberAmount',
     'decemberAmount'];

  displayedColumnsWithActions: string[] = ['orgName', 'currentAmount', 'januaryAmount', 'februaryAmount', 'marchAmount', 'aprilAmount',
    'mayAmount', 'juneAmount', 'julyAmount', 'augustAmount', 'septemberAmount', 'octoberAmount', 'novemberAmount',
    'decemberAmount'];

  constructor(private budgetMatrixService: BudgetMatrixService,
              public dialog: MatDialog) { }

  budgetRow: BudgetMatrix;
  budgetOutRows: BudgetMatrix[] = [];
  budgetInRows: BudgetMatrix[] = [];
  budgetSumRows: BudgetMatrix[] = [];

  incomingSum: BudgetMatrix[] = [];
  outgoingSum: BudgetMatrix[] = [];
  differenceSum: BudgetMatrix[] = [];

  curOutgoingAmount: number;
  janOutgoingAmount: number;
  febOutgoingAmount: number;
  marOutgoingAmount: number;
  aprOutgoingAmount: number;
  mayOutgoingAmount: number;
  junOutgoingAmount: number;
  julOutgoingAmount: number;
  augOutgoingAmount: number;
  sepOutgoingAmount: number;
  octOutgoingAmount: number;
  novOutgoingAmount: number;
  decOutgoingAmount: number;

  curIncomingAmount: number;
  janIncomingAmount: number;
  febIncomingAmount: number;
  marIncomingAmount: number;
  aprIncomingAmount: number;
  mayIncomingAmount: number;
  junIncomingAmount: number;
  julIncomingAmount: number;
  augIncomingAmount: number;
  sepIncomingAmount: number;
  octIncomingAmount: number;
  novIncomingAmount: number;
  decIncomingAmount: number;

  ngOnInit() {
    this.populateMatrix();
    this.userId = this.user;
  }

  populateMatrix(): void {
    this.budgetMatrixService.getFutureOutputBudgetByUserID(this.user)
      .subscribe(budgetRow => {
        this.budgetOutRows = budgetRow;
      }
      );

    this.budgetMatrixService.getFutureInputBudgetByUserID(this.user)
      .subscribe(budgetRow => {
        this.budgetInRows = budgetRow;
      }
      );

    this.getAllSums();
  }

  setCurrentMonth() {
    // TODO: Call API endpoint to setCurrentMonth
    this.hideMaintenanceColumn();
  }

  completeCurrentMonth() {
    // TODO: Call API endpoint to setCurrentMonth
    this.budgetMatrixService.completCurrentMonth(this.userId, false).subscribe(
      // TODO: update subscriber with data
    );
    this.hideMaintenanceColumn();
  }

  forceCompleteCurrentMonth() {
    this.budgetMatrixService.completCurrentMonth(this.userId, true).subscribe();
    this.hideMaintenanceColumn();
  }

  getAllSums() {
        this.budgetMatrixService.getFutureSumsBudgetByUserID(this.user)
        .subscribe(budgetRow => {
          this.budgetSumRows = budgetRow;
          this.incomingSum = this.budgetSumRows.filter(incoming => incoming.direction === 'I');
          this.outgoingSum = this.budgetSumRows.filter(outgoing => outgoing.direction === 'O');
          this.differenceSum = this.budgetSumRows.filter(diff => diff.direction === 'D');

          this.getOutgoingSums();
          this.getIncomingSums();
        }
      );
  }

  calculateAllSums() {
    this.calculateIncomingSums();
    this.calculateOutGoingSums();
    this.calculateDifference();
  }

  private calculateIncomingSums() {
    this.curIncomingAmount = this.budgetInRows.map(t => t.currentAmount).reduce((acc, value) => acc + value);
    this.janIncomingAmount = this.budgetInRows.map(t => t.januaryAmount).reduce((acc, value) => acc + value);
    this.febIncomingAmount = this.budgetInRows.map(t => t.februaryAmount).reduce((acc, value) => acc + value);
    this.marIncomingAmount = this.budgetInRows.map(t => t.marchAmount).reduce((acc, value) => acc + value);
    this.aprIncomingAmount = this.budgetInRows.map(t => t.aprilAmount).reduce((acc, value) => acc + value);
    this.mayIncomingAmount = this.budgetInRows.map(t => t.mayAmount).reduce((acc, value) => acc + value);
    this.junIncomingAmount = this.budgetInRows.map(t => t.juneAmount).reduce((acc, value) => acc + value);
    this.julIncomingAmount = this.budgetInRows.map(t => t.julyAmount).reduce((acc, value) => acc + value);
    this.augIncomingAmount = this.budgetInRows.map(t => t.augustAmount).reduce((acc, value) => acc + value);
    this.sepIncomingAmount = this.budgetInRows.map(t => t.septemberAmount).reduce((acc, value) => acc + value);
    this.octIncomingAmount = this.budgetInRows.map(t => t.octoberAmount).reduce((acc, value) => acc + value);
    this.novIncomingAmount = this.budgetInRows.map(t => t.novemberAmount).reduce((acc, value) => acc + value);
    this.decIncomingAmount = this.budgetInRows.map(t => t.decemberAmount).reduce((acc, value) => acc + value);
  }

  private calculateOutGoingSums() {
    this.curOutgoingAmount = this.budgetOutRows.map(t => t.currentAmount).reduce((acc, value) => acc + value);
    this.janOutgoingAmount = this.budgetOutRows.map(t => t.januaryAmount).reduce((acc, value) => acc + value);
    this.febOutgoingAmount = this.budgetOutRows.map(t => t.februaryAmount).reduce((acc, value) => acc + value);
    this.marOutgoingAmount = this.budgetOutRows.map(t => t.marchAmount).reduce((acc, value) => acc + value);
    this.aprOutgoingAmount = this.budgetOutRows.map(t => t.aprilAmount).reduce((acc, value) => acc + value);
    this.mayOutgoingAmount = this.budgetOutRows.map(t => t.mayAmount).reduce((acc, value) => acc + value);
    this.junOutgoingAmount = this.budgetOutRows.map(t => t.juneAmount).reduce((acc, value) => acc + value);
    this.julOutgoingAmount = this.budgetOutRows.map(t => t.julyAmount).reduce((acc, value) => acc + value);
    this.augOutgoingAmount = this.budgetOutRows.map(t => t.augustAmount).reduce((acc, value) => acc + value);
    this.sepOutgoingAmount = this.budgetOutRows.map(t => t.septemberAmount).reduce((acc, value) => acc + value);
    this.octOutgoingAmount = this.budgetOutRows.map(t => t.octoberAmount).reduce((acc, value) => acc + value);
    this.novOutgoingAmount = this.budgetOutRows.map(t => t.novemberAmount).reduce((acc, value) => acc + value);
    this.decOutgoingAmount = this.budgetOutRows.map(t => t.decemberAmount).reduce((acc, value) => acc + value);
  }

  private calculateDifference() {
    this.differenceSum[0].currentAmount =  this.curIncomingAmount - this.curOutgoingAmount;
    this.differenceSum[0].januaryAmount =  this.janIncomingAmount - this.janOutgoingAmount;
    this.differenceSum[0].februaryAmount =  this.febIncomingAmount - this.febOutgoingAmount;
    this.differenceSum[0].marchAmount =  this.marIncomingAmount - this.marOutgoingAmount;
    this.differenceSum[0].aprilAmount =  this.aprIncomingAmount - this.aprOutgoingAmount;
    this.differenceSum[0].mayAmount =  this.mayIncomingAmount - this.mayOutgoingAmount;
    this.differenceSum[0].juneAmount =  this.junIncomingAmount - this.junOutgoingAmount;
    this.differenceSum[0].julyAmount =  this.julIncomingAmount - this.julOutgoingAmount;
    this.differenceSum[0].augustAmount =  this.augIncomingAmount - this.augOutgoingAmount;
    this.differenceSum[0].septemberAmount =  this.sepIncomingAmount - this.sepOutgoingAmount;
    this.differenceSum[0].octoberAmount =  this.octIncomingAmount - this.octOutgoingAmount;
    this.differenceSum[0].novemberAmount =  this.novIncomingAmount - this.novOutgoingAmount;
    this.differenceSum[0].decemberAmount =  this.decIncomingAmount - this.decOutgoingAmount;
  }

  getOutgoingSums() {
    this.janOutgoingAmount = this.outgoingSum.map(t => t.januaryAmount).reduce((acc, value) => acc + value);
    this.febOutgoingAmount = this.outgoingSum.map(t => t.februaryAmount).reduce((acc, value) => acc + value);
    this.marOutgoingAmount = this.outgoingSum.map(t => t.marchAmount).reduce((acc, value) => acc + value);
    this.aprOutgoingAmount = this.outgoingSum.map(t => t.aprilAmount).reduce((acc, value) => acc + value);
    this.mayOutgoingAmount = this.outgoingSum.map(t => t.mayAmount).reduce((acc, value) => acc + value);
    this.junOutgoingAmount = this.outgoingSum.map(t => t.juneAmount).reduce((acc, value) => acc + value);
    this.julOutgoingAmount = this.outgoingSum.map(t => t.julyAmount).reduce((acc, value) => acc + value);
    this.augOutgoingAmount = this.outgoingSum.map(t => t.augustAmount).reduce((acc, value) => acc + value);
    this.sepOutgoingAmount = this.outgoingSum.map(t => t.septemberAmount).reduce((acc, value) => acc + value);
    this.octOutgoingAmount = this.outgoingSum.map(t => t.octoberAmount).reduce((acc, value) => acc + value);
    this.novOutgoingAmount = this.outgoingSum.map(t => t.novemberAmount).reduce((acc, value) => acc + value);
    this.decOutgoingAmount = this.outgoingSum.map(t => t.decemberAmount).reduce((acc, value) => acc + value);
    this.curOutgoingAmount = this.outgoingSum.map(t => t.currentAmount).reduce((acc, value) => acc + value);
  }

  getIncomingSums() {
    this.janIncomingAmount = this.incomingSum.map(t => t.januaryAmount).reduce((acc, value) => acc + value);
    this.febIncomingAmount = this.incomingSum.map(t => t.februaryAmount).reduce((acc, value) => acc + value);
    this.marIncomingAmount = this.incomingSum.map(t => t.marchAmount).reduce((acc, value) => acc + value);
    this.aprIncomingAmount = this.incomingSum.map(t => t.aprilAmount).reduce((acc, value) => acc + value);
    this.mayIncomingAmount = this.incomingSum.map(t => t.mayAmount).reduce((acc, value) => acc + value);
    this.junIncomingAmount = this.incomingSum.map(t => t.juneAmount).reduce((acc, value) => acc + value);
    this.julIncomingAmount = this.incomingSum.map(t => t.julyAmount).reduce((acc, value) => acc + value);
    this.augIncomingAmount = this.incomingSum.map(t => t.augustAmount).reduce((acc, value) => acc + value);
    this.sepIncomingAmount = this.incomingSum.map(t => t.septemberAmount).reduce((acc, value) => acc + value);
    this.octIncomingAmount = this.incomingSum.map(t => t.octoberAmount).reduce((acc, value) => acc + value);
    this.novIncomingAmount = this.incomingSum.map(t => t.novemberAmount).reduce((acc, value) => acc + value);
    this.decIncomingAmount = this.incomingSum.map(t => t.decemberAmount).reduce((acc, value) => acc + value);
    this.curIncomingAmount = this.incomingSum.map(t => t.currentAmount).reduce((acc, value) => acc + value);
  }

  showMaintenanceColumn() {
    this.displayedColumnsWithActions.push('actions');
    this.showMaintenceColumn = true;
  }

  hideMaintenanceColumn() {
    this.displayedColumnsWithActions.pop();
    this.showMaintenceColumn = false;
  }

  addNew(direction: string) {
    const userId = this.userId;
    const frequencyPerMonth = 1;
    const dialogRef = this.dialog.open(MatrixMaintenanceComponent, {
      data: { direction, frequencyPerMonth, userId }
    });

    dialogRef.afterClosed().subscribe(
      x => {
        if (x === 1) {
          if (direction === 'O') {
            this.budgetOutRows.push(this.budgetMatrixService.getDialogData());
          } else if (direction === 'I') {
            this.budgetInRows.push(this.budgetMatrixService.getDialogData());
          }
          this.calculateAllSums();
          this.hideMaintenanceColumn();
        }
      }
    );
  }

  editRow(orgName: string, direction: string, currentAmount: number,  januaryAmount: number, februaryAmount: number,
          marchAmount: number,
          aprilAmount: number, mayAmount: number, juneAmount: number, julyAmount: number, augustAmount: number,
          septemberAmount: number, octoberAmount: number, novemberAmount: number, decemberAmount: number) {

    const userId = this.userId;
    const frequencyPerMonth = 1;
    const dialogRef = this.dialog.open(MatrixMaintenanceComponent, {
      data: {
        orgName, direction, frequencyPerMonth, userId, currentAmount,
        januaryAmount, februaryAmount, marchAmount,
        aprilAmount, mayAmount, juneAmount, julyAmount, augustAmount,
        septemberAmount, octoberAmount, novemberAmount, decemberAmount
      }
    });

    dialogRef.afterClosed().subscribe(
      x => {
        if (x === 1) {
          if (direction === 'O') {
            const index = this.budgetOutRows.findIndex(item => item.orgName === orgName);
            this.budgetOutRows[index] = this.budgetMatrixService.getDialogData();
          } else if (direction === 'I') {
            const index = this.budgetInRows.findIndex(item => item.orgName === orgName);
            // console.log(this.budgetMatrixService.getDialogData());
            this.budgetInRows[index] = this.budgetMatrixService.getDialogData();
          }
          this.calculateAllSums();
          this.hideMaintenanceColumn();
        }
      }
    );

  }

  deleteRow(orgName: string, direction: string) {
    const userId = this.userId;
    const showRemoved = true;
    const frequencyPerMonth = 0;
    const dialogRef = this.dialog.open(MatrixMaintenanceComponent, {
      data: { orgName, direction, frequencyPerMonth, userId, showRemoved }
    });

    dialogRef.afterClosed().subscribe(
      x => {
        if (x === 1) {
          if (direction === 'O') {
            const index = this.budgetOutRows.findIndex(item => item.orgName === orgName);
            this.budgetOutRows.splice(index, 1);
          } else if (direction === 'I') {
            const index = this.budgetInRows.findIndex(item => item.orgName === orgName);
            this.budgetInRows.splice(index, 1);
          }
          this.calculateAllSums();
          this.hideMaintenanceColumn();
        }
      }
    );
  }

}
