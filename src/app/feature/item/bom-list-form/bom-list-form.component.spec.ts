import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BomListFormComponent } from './bom-list-form.component';

describe('BomListFormComponent', () => {
  let component: BomListFormComponent;
  let fixture: ComponentFixture<BomListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BomListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BomListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
