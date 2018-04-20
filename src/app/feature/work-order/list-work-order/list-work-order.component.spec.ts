import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkOrderComponent } from './list-work-order.component';

describe('ListWorkOrderComponent', () => {
  let component: ListWorkOrderComponent;
  let fixture: ComponentFixture<ListWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
