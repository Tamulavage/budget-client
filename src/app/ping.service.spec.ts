import { TestBed } from '@angular/core/testing';

import { PingService } from './services/ping.service';

describe('PingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PingService = TestBed.get(PingService);
    expect(service).toBeTruthy();
  });
});
