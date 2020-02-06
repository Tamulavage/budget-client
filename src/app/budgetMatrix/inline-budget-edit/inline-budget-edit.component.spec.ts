import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineBudgetEditComponent } from './inline-budget-edit.component';

describe('InlineBudgetEditComponent', () => {
  let component: InlineBudgetEditComponent;
  let fixture: ComponentFixture<InlineBudgetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineBudgetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineBudgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
