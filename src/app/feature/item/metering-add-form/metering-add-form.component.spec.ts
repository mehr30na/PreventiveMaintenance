import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteringAddFormComponent } from './metering-add-form.component';

describe('MeteringAddFormComponent', () => {
  let component: MeteringAddFormComponent;
  let fixture: ComponentFixture<MeteringAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteringAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteringAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
