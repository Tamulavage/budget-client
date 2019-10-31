import { TestBed } from '@angular/core/testing';

import { BudgetMatrixService } from './budget-matrix.service';

describe('BudgetMatrixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetMatrixService = TestBed.get(BudgetMatrixService);
    expect(service).toBeTruthy();
  });
});
