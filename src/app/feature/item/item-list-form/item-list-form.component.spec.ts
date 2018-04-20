import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListFormComponent } from './item-list-form.component';

describe('ItemListFormComponent', () => {
  let component: ItemListFormComponent;
  let fixture: ComponentFixture<ItemListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
