import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TansactionHistoryComponent } from './tansaction-history.component';

describe('TansactionHistoryComponent', () => {
  let component: TansactionHistoryComponent;
  let fixture: ComponentFixture<TansactionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TansactionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TansactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
