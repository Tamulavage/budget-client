import { Component, OnInit, Input } from '@angular/core';
import { BudgetMatrixService } from '../budget-matrix.service';
import { BudgetMatrix } from '../budgetMatrix';

@Component({
  selector: 'app-budget-matrix-maintenance',
  templateUrl: './budget-matrix-maintenance.component.html',
  styleUrls: ['./budget-matrix-maintenance.component.css']
})
export class BudgetMatrixMaintenanceComponent implements OnInit {
  @Input() userId: number;

  singleLineItem: BudgetMatrix = {
    orgId: null,
    orgName: null,
    direction: null,
    frequencyPerMonth: null,
    januaryAmount: null,
    februaryAmount: null,
    marchAmount: null,
    aprilAmount: null,
    mayAmount: null,
    juneAmount: null,
    julyAmount: null,
    augustAmount: null,
    septemberAmount: null,
    octoberAmount: null,
    novemberAmount: null,
    decemberAmount: null
  };

  showMaintenance: boolean;
  showAddMaintenance: boolean;

  constructor(private budgetMatrixService: BudgetMatrixService) { }

  ngOnInit() {
    this.showMaintenance = false;
    this.showAddMaintenance = false;
  }

  addLineItem() {
    this.toggleShowMaintenance();
    this.budgetMatrixService.addNewLineItemByUserID(this.userId, this.singleLineItem).subscribe();
  }

  showAddNewLineItem() {
    this.toggleShowAddMaintenance();
    this.toggleShowMaintenance();
  }

  showRemoveLineItem() {
    // TODO: implement remove
    this.toggleShowMaintenance();
  }

  cancel() {
    this.toggleShowMaintenance();
    this.toggleShowAddMaintenance();
  }

  // TODO: change to 1 and pass var name to update
  toggleShowMaintenance() {
    if (this.showMaintenance) {
      this.showMaintenance = false;
    } else {
      this.showMaintenance = true;
    }
  }



  toggleShowAddMaintenance() {
    if (this.showAddMaintenance) {
      this.showAddMaintenance = false;
    } else {
      this.showAddMaintenance = true;
    }
  }

}
