import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAddFormComponent } from './business-add-form.component';

describe('BusinessAddFormComponent', () => {
  let component: BusinessAddFormComponent;
  let fixture: ComponentFixture<BusinessAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
