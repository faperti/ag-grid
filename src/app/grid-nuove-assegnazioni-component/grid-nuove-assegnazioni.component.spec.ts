import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridNuoveAssegnazioniComponent } from './grid-nuove-assegnazioni.component';

describe('GridRiassegnazioniComponent', () => {
  let component: GridNuoveAssegnazioniComponent;
  let fixture: ComponentFixture<GridNuoveAssegnazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridNuoveAssegnazioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridNuoveAssegnazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
