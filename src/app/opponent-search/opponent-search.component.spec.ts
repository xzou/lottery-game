import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpponentSearchComponent } from './opponent-search.component';

describe('OpponentSearchComponent', () => {
  let component: OpponentSearchComponent;
  let fixture: ComponentFixture<OpponentSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpponentSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpponentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
