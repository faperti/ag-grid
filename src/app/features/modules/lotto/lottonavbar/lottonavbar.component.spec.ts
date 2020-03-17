import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottonavbarComponent } from './lottonavbar.component';

describe('LottonavbarComponent', () => {
  let component: LottonavbarComponent;
  let fixture: ComponentFixture<LottonavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LottonavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottonavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
