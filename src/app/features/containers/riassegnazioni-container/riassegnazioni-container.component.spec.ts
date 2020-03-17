import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiassegnazioniContainerComponent } from './riassegnazioni-container.component';

describe('RiassegnazioniContainerComponent', () => {
  let component: RiassegnazioniContainerComponent;
  let fixture: ComponentFixture<RiassegnazioniContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiassegnazioniContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiassegnazioniContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
