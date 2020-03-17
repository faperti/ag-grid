import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottocollaudoComponent } from './lottocollaudo.component';

describe('LottocollaudoComponent', () => {
  let component: LottocollaudoComponent;
  let fixture: ComponentFixture<LottocollaudoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LottocollaudoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottocollaudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
