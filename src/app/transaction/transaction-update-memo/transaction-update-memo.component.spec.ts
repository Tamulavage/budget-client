import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionUpdateMemoComponent } from './transaction-update-memo.component';

describe('TransactionUpdateMemoComponent', () => {
  let component: TransactionUpdateMemoComponent;
  let fixture: ComponentFixture<TransactionUpdateMemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionUpdateMemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionUpdateMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
