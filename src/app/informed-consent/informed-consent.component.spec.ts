import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformedConsentComponent } from './informed-consent.component';

describe('InformedConsentComponent', () => {
  let component: InformedConsentComponent;
  let fixture: ComponentFixture<InformedConsentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformedConsentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformedConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
