import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessListFormComponent } from './business-list-form.component';

describe('BusinessListFormComponent', () => {
  let component: BusinessListFormComponent;
  let fixture: ComponentFixture<BusinessListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
