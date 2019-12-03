import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottoclientiComponent } from './lottoclienti.component';

describe('LottoclientiComponent', () => {
  let component: LottoclientiComponent;
  let fixture: ComponentFixture<LottoclientiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LottoclientiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LottoclientiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
