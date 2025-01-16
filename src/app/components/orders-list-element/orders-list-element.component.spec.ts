import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListElementComponent } from './orders-list-element.component';

describe('OrdersListElementComponent', () => {
  let component: OrdersListElementComponent;
  let fixture: ComponentFixture<OrdersListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersListElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
