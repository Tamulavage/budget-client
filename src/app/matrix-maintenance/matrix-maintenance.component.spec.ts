import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixMaintenanceComponent } from './matrix-maintenance.component';

describe('MatrixMaintenanceComponent', () => {
  let component: MatrixMaintenanceComponent;
  let fixture: ComponentFixture<MatrixMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
