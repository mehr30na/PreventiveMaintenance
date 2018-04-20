import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyAddFormComponent } from './warranty-add-form.component';

describe('WarrantyAddFormComponent', () => {
  let component: WarrantyAddFormComponent;
  let fixture: ComponentFixture<WarrantyAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
