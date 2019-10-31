import { Component, OnInit } from '@angular/core';

import { BudgetMatrix } from '../budgetMatrix';
import { BudgetMatrixService } from '../budget-matrix.service';

const janOutGoingElementTeg = 'janOutgoingTotal';

const septDiffElementTeg = 'septDiffTotal';

@Component({
  selector: 'app-budget-matrix',
  templateUrl: './budget-matrix.component.html',
  styleUrls: ['./budget-matrix.component.css']
})
export class BudgetMatrixComponent implements OnInit {

  constructor(private budgetMatrixService: BudgetMatrixService) { }

  budgetRow: BudgetMatrix;
  budgetOutRows: BudgetMatrix[] = [];
  budgetInRows: BudgetMatrix[] = [];
  budgetSumRows: BudgetMatrix[] = [];

  incomingSum: BudgetMatrix[] = [];
  outgoingSum: BudgetMatrix[] = [];
  differenceSum: BudgetMatrix[] = [];

  janOutgoingTotal: number;
  febOutgoingTotal: number;
  marchOutgoingTotal: number;
  aprilOutgoingTotal: number;
  mayOutgoingTotal: number;
  juneOutgoingTotal: number;
  julyOutgoingTotal: number;
  augOutgoingTotal: number;
  septOutgoingTotal: number;
  octOutgoingTotal: number;
  novOutgoingTotal: number;
  decOutgoingTotal: number;

  ngOnInit() {
    this.populateMatrix();
  }

  populateMatrix(): void {
    this.budgetMatrixService.getFutureOutputBudgetByUserID(2)
      .subscribe(budgetRow => {
        this.budgetOutRows = budgetRow;
        this.janOutgoingTotal  = this.changeFormat(janOutGoingElementTeg,
            this.budgetOutRows.map(t => t.januaryAmount).reduce((acc, value) => acc + value));
        this.febOutgoingTotal =  this.budgetOutRows.map(t => t.februaryAmount).reduce((acc, value) => acc + value);
        this.marchOutgoingTotal =  this.budgetOutRows.map(t => t.marchAmount).reduce((acc, value) => acc + value);
        this.aprilOutgoingTotal =  this.budgetOutRows.map(t => t.aprilAmount).reduce((acc, value) => acc + value);
        this.mayOutgoingTotal =  this.budgetOutRows.map(t => t.mayAmount).reduce((acc, value) => acc + value);
        this.juneOutgoingTotal =  this.budgetOutRows.map(t => t.juneAmount).reduce((acc, value) => acc + value);
        this.julyOutgoingTotal =  this.budgetOutRows.map(t => t.julyAmount).reduce((acc, value) => acc + value);
        this.augOutgoingTotal =  this.budgetOutRows.map(t => t.augustAmount).reduce((acc, value) => acc + value);
        this.septOutgoingTotal =  this.budgetOutRows.map(t => t.septemberAmount).reduce((acc, value) => acc + value);
        // this.septOutgoingTotal  = this.changeFormat(septDiffElementTeg,
        //   this.budgetOutRows.map(t => t.septemberAmount).reduce((acc, value) => acc + value));
        this.octOutgoingTotal =  this.budgetOutRows.map(t => t.octoberAmount).reduce((acc, value) => acc + value);
        this.novOutgoingTotal =  this.budgetOutRows.map(t => t.novemberAmount).reduce((acc, value) => acc + value);
        this.decOutgoingTotal =  this.budgetOutRows.map(t => t.decemberAmount).reduce((acc, value) => acc + value);
      }
      );

    this.budgetMatrixService.getFutureInputBudgetByUserID(2)
      .subscribe(budgetRow => {
        this.budgetInRows = budgetRow;
      }
      );

    this.budgetMatrixService.getFutureSumsBudgetByUserID(2)
      .subscribe(budgetRow => {
        this.budgetSumRows = budgetRow;
        this.incomingSum = this.budgetSumRows.filter(incoming => incoming.direction === 'I');
        this.outgoingSum = this.budgetSumRows.filter(incoming => incoming.direction === 'O');
        this.differenceSum = this.budgetSumRows.filter(incoming => incoming.direction === 'D');

        // this.changeFormat(septDiffElementTeg,
        //   this.differenceSum.map(t => t.septemberAmount).reduce((acc, value) => acc + value));
      }
      );

  }

  changeFormat(elementTag: string, totalMonth: number): number {
    console.log(elementTag);
    console.log(totalMonth);
    if (totalMonth < 0) {
           (document.getElementById(elementTag) as HTMLInputElement).setAttribute('class', 'red');
           // review ngClass
    }
    return totalMonth;
  }


}
