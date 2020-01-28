import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckbookGraphComponent } from './checkbook-graph.component';

describe('CheckbookGraphComponent', () => {
  let component: CheckbookGraphComponent;
  let fixture: ComponentFixture<CheckbookGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckbookGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckbookGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
