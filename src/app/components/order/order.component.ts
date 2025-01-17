import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { DemoDataService } from '../../services/demo-data.service';
import { Order } from '../../classes/order';
import { OrdersService } from '../../services/orders.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orderId: string = '';
  tenant: string = '';
  route: ActivatedRoute = inject(ActivatedRoute);
  userId: string = '';
  order: Order = {
    buyer_id: "",
    seller_id: "",
    product_id: "",
    description: "",
    quantity: 0,
    address: "",
    status: "",
    type: "",
  };
  newStatus: string = 'pending';
  protected formError!: string;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private demoDataService: DemoDataService,
    private ordersService: OrdersService
  ) {
  }

  ngOnInit() {
    this.tenant = this.router.url.split('/')[1];
    console.log("[order component] tenant: ", this.tenant);
    this.userId = this.authenticationService.getCurrentUser(this.tenant)?.id || '';
    if (!this.userId) {
      alert('Please login to view your orders');
      this.router.navigate([`/${this.tenant}/login`]);
    }
    this.orderId = this.route.snapshot.params['id'];
    this.loadOrder(this.orderId);
  }

  async loadOrder(orderId: string) {
    this.ordersService.getOrderById(this.tenant, orderId).subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (error) => {
        console.error('Error loading order:', error);
        this.formError = 'Error loading order';
      },
    });
  }

  changeStatus() {
    if (this.orderId) {
      if(this.order.seller_id !== this.userId) {
        console.error('User is not the seller of this order');
        alert('User is not the seller of this order');
        return;
      }
      this.order.status = this.newStatus;
      this.ordersService.updateOrder(this.tenant, this.order, this.orderId).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate([`/${this.tenant}/orders`]);
        },
        error: (error) => {
          console.error('Error updating order:', error);
          this.formError = 'Error updating order';
        },
      });
    }
  }
}
