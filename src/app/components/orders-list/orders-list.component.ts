import { Component } from '@angular/core';
import { Order } from '../../classes/order';
import { OrdersService } from '../../services/orders.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { OrdersListElementComponent } from '../orders-list-element/orders-list-element.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [OrdersListElementComponent, CommonModule],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {
  userId: string = '';
  tenant: string = '';
  sellerOrders: Order[] = [];
  buyerOrders: Order[] = [];
  constructor(
    private ordersService: OrdersService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.tenant = this.router.url.split('/')[1];
    this.userId = this.authenticationService.getCurrentUser(this.tenant)?._id || '';
    if(!this.userId) {
      console.log('Could not get current user');
      alert('Please log in to view your orders');
      this.router.navigateByUrl(`${this.tenant}/login`);
    }
    this.loadOrdersBuyer();
    this.loadOrdersSeller();
  }

  loadOrdersBuyer() {
    this.ordersService.getOrdersBuyer(this.userId, this.tenant).subscribe({
      next: (orders) => {
        this.buyerOrders = orders;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      },
    });
  }

  loadOrdersSeller() {
    this.ordersService.getOrdersSeller(this.userId, this.tenant).subscribe({
      next: (orders) => {
        this.sellerOrders = orders;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      },
    });
  }

}
