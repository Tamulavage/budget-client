import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMatrixMaintenanceComponent } from './budget-matrix-maintenance.component';

describe('BudgetMatrixMaintenanceComponent', () => {
  let component: BudgetMatrixMaintenanceComponent;
  let fixture: ComponentFixture<BudgetMatrixMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetMatrixMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetMatrixMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
