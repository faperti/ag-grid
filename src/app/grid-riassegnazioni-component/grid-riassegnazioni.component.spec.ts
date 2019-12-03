import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRiassegnazioniComponent } from './grid-riassegnazioni.component';

describe('GridRiasegnazioniComponent', () => {
  let component: GridRiassegnazioniComponent;
  let fixture: ComponentFixture<GridRiassegnazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridRiassegnazioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRiassegnazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
