import { TestBed } from '@angular/core/testing';

import { MaintenanceService } from './services/maintenance.service';

describe('MaintenanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaintenanceService = TestBed.get(MaintenanceService);
    expect(service).toBeTruthy();
  });
});
