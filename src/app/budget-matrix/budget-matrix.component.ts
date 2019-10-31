import { Component, OnInit, Input } from '@angular/core';

import { BudgetMatrix } from '../budgetMatrix';
import { BudgetMatrixService } from '../budget-matrix.service';

@Component({
  selector: 'app-budget-matrix',
  templateUrl: './budget-matrix.component.html',
  styleUrls: ['./budget-matrix.component.css']
})
export class BudgetMatrixComponent implements OnInit {
  @Input() user: number;

  constructor(private budgetMatrixService: BudgetMatrixService) { }

  budgetRow: BudgetMatrix;
  budgetOutRows: BudgetMatrix[] = [];
  budgetInRows: BudgetMatrix[] = [];
  budgetSumRows: BudgetMatrix[] = [];

  incomingSum: BudgetMatrix[] = [];
  outgoingSum: BudgetMatrix[] = [];
  differenceSum: BudgetMatrix[] = [];

  ngOnInit() {
    this.populateMatrix();
  }

  populateMatrix(): void {
    this.budgetMatrixService.getFutureOutputBudgetByUserID(2)
      .subscribe(budgetRow => {
        this.budgetOutRows = budgetRow;
      }
      );

    this.budgetMatrixService.getFutureInputBudgetByUserID(this.user)
      .subscribe(budgetRow => {
        this.budgetInRows = budgetRow;
      }
      );

    this.budgetMatrixService.getFutureSumsBudgetByUserID(this.user)
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
