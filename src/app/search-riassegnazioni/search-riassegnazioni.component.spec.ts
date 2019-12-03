import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRiassegnazioniComponent } from './search-riassegnazioni.component';

describe('SearchRiassegnazioniComponent', () => {
  let component: SearchRiassegnazioniComponent;
  let fixture: ComponentFixture<SearchRiassegnazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRiassegnazioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRiassegnazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
