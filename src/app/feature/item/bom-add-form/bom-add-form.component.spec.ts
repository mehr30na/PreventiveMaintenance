import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BomAddFormComponent } from './bom-add-form.component';

describe('BomAddFormComponent', () => {
  let component: BomAddFormComponent;
  let fixture: ComponentFixture<BomAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BomAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BomAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
