import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../classes/order';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-custom-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-order.component.html',
  styleUrl: './custom-order.component.css'
})
export class CustomOrderComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  sellerId = this.route.snapshot.params['id'];
  tenant: string = '';
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private ordersService: OrdersService
  ) { }
  protected formError!: string;
  protected orderData: Order = {
    buyer_id: '',
    seller_id: this.sellerId,
    description: '',
    quantity: 0,
    address: '',
    status: 'pending',
    type: 'custom'
  };
  protected price?: number;
  public header = {
    title: "Login",
  };

  ngOnInit() {
    this.tenant = this.router.url.split('/')[1];
    this.orderData.buyer_id = this.authenticationService.getCurrentUser(this.tenant)?.id || '';
    if(!this.orderData.buyer_id) {
      const user = this.authenticationService.getCurrentUser(this.tenant);
      console.log(user);
      this.orderData.buyer_id = user?.id || '';
    }
    if (!this.orderData.buyer_id) {
      console.log('Could not get current user');
      alert('Please log in to place an order.');
    }
  }

  public onOrderSubmit(): void {
    this.formError = "";
    if (!this.orderData.buyer_id) {
      this.formError = "Please log in to place an order.";
      this.router.navigateByUrl(`${this.tenant}/login`);
    } else if (!this.orderData.description) {
      this.formError = "Please enter a description.";
    } else if (!this.orderData.quantity) {
      this.formError = "Please enter a quantity.";
    } else if (!this.orderData.address) {
      this.formError = "Please enter an address.";
    }
    else this.doOrder();
  }
  private doOrder(): void {
    this.ordersService.createOrder(this.tenant, this.orderData).subscribe({
      next: (response) => {
        console.log(response);
        alert('Order placed successfully');
        this.router.navigateByUrl(`/${this.tenant}`);
      },
      error: (error) => {
        console.log(error);
        this.formError = "An error occurred while placing the order.";
        if (error.error.message) {
          this.formError = error.error.message;
        }
      }
    });
  }
}
