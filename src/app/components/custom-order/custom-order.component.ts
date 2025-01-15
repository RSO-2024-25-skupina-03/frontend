import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../classes/order';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { FormsModule } from '@angular/forms';

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
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private orderService: OrderService
  ) {
    this.orderData.buyer_id = this.authenticationService.getCurrentUser()?._id || '';
    if (!this.orderData.buyer_id) {
      console.log('Could not get current user');
      alert('Please log in to place an order.');
      this.router.navigateByUrl('/login');
    }
   }
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
  public onOrderSubmit(): void {
    this.formError = "";
    if(!this.orderData.buyer_id) {
      this.formError = "Please log in to place an order.";
      this.router.navigateByUrl('/login');
    } else if (!this.orderData.description){
      this.formError = "Please enter a description.";
    } else if (!this.orderData.quantity){
      this.formError = "Please enter a quantity.";
    } else if (!this.orderData.address){
      this.formError = "Please enter an address.";
    }
    else this.doOrder();
  }
  private doOrder(): void {
    this.orderService.createOrder(this.orderData).subscribe(
      (response) => {
        console.log(response);
        alert('Order placed successfully');
        this.router.navigateByUrl('/');
      },
      (error) => {
        console.log(error);
        this.formError = "An error occurred while placing the order.";
        if (error.error.message) {
          this.formError = error.error.message;
        } 
      }
    );
  }
}
