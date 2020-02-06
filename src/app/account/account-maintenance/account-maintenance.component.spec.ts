import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMaintenanceComponent } from './account-maintenance.component';

describe('AccountMaintenanceComponent', () => {
  let component: AccountMaintenanceComponent;
  let fixture: ComponentFixture<AccountMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
