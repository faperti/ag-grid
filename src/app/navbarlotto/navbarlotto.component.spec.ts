import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarlottoComponent } from './navbarlotto.component';

describe('NavbarlottoComponent', () => {
  let component: NavbarlottoComponent;
  let fixture: ComponentFixture<NavbarlottoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarlottoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarlottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
