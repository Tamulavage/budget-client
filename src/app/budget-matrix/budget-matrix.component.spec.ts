import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetMatrixComponent } from './budget-matrix.component';

describe('BudgetMatrixComponent', () => {
  let component: BudgetMatrixComponent;
  let fixture: ComponentFixture<BudgetMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
