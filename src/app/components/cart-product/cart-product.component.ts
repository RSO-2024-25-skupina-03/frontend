import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Product } from '../../classes/product';
import { CartService } from '../../services/cart.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css'
})
export class CartProductComponent {
  @Input() cartProduct!: {product: Product, quantity: number};
  userId: string = '';
  tenant: string = '';
  constructor(
    private cartService: CartService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    const user = this.authenticationService.getCurrentUser(this.tenant);
    this.userId = user?.id || '';
    this.tenant = this.router.url.split('/')[1];
    if(!this.userId) {
      console.log('Could not get current user for cart product');
    }
  }

  cartAdd() {
    if(this.userId === '') {
      this.userId = this.authenticationService.getCurrentUser(this.tenant)?.id || '';
    }
    if(this.userId === '') {
      console.log('Could not get current user for cart product');
      return;
    }
    if(!this.cartProduct.product.product_id) {
      console.log('Could not get product id for cart product');
      return;
    }
    this.cartService.addToCart(this.userId, this.cartProduct.product.product_id, this.tenant).subscribe({
      next: () => {
        this.cartProduct.quantity++;
        console.log('Added to cart');
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
      }
    });
  }

  cartDelete() {
    if(this.userId === '') {
      this.userId = this.authenticationService.getCurrentUser(this.tenant)?.id || '';
    }
    if(this.userId === '') {
      console.log('Could not get current user for cart product');
      return;
    }
    if(!this.cartProduct.product.product_id) {
      console.log('Could not get product id for cart product');
      return;
    }
    this.cartService.deleteFromCart(this.userId, this.cartProduct.product.product_id, this.tenant).subscribe({
      next: () => {
        this.cartProduct.quantity--;
        console.log('Removed from cart');
      },
      error: (error) => {
        console.error('Error removing from cart:', error);
      }
    });
  }

  cartRemove() {
    if(this.userId === '') {
      this.userId = this.authenticationService.getCurrentUser(this.tenant)?.id || '';
    }
    if(this.userId === '') {
      console.log('Could not get current user for cart product');
      return;
    }
    if(!this.cartProduct.product.product_id) {
      console.log('Could not get product id for cart product');
      return;
    }
    this.cartService.removeFromCart(this.userId, this.cartProduct.product.product_id, this.tenant).subscribe({
      next: () => {
        this.cartProduct.quantity = this.cartProduct.quantity - 1;
        console.log('Removed from cart');
      },
      error: (error) => {
        console.error('Error removing from cart:', error);
      }
    });
  }

}
