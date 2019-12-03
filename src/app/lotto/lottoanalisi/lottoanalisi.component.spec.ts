import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoanalisiComponent } from './lottoanalisi.component';

describe('LottoanalisiComponent', () => {
  let component: LottoanalisiComponent;
  let fixture: ComponentFixture<LottoanalisiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LottoanalisiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoanalisiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
