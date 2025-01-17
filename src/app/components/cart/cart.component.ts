import { Component, inject } from '@angular/core';
import { CartProductComponent } from "../cart-product/cart-product.component";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../classes/product';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { AuthenticationService } from '../../services/authentication.service';
import { StockService } from '../../services/stock.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  userId = '';
  tenant = '';
  address = '';
  userCart: { product_id: string, quantity: number }[] = [];
  cartProductsList: { product: Product, quantity: number }[] = [];
  filteredProducts: Product[] = [];
  totalPrice: number = 0;
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private stockService: StockService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.tenant = this.router.url.split('/')[1];
    this.userId = this.authenticationService.getCurrentUser(this.tenant).id || '';
    if (!this.userId) {
      console.log(this.authenticationService.getCurrentUser(this.tenant));

      alert('Please login to view your cart');
    }
    this.loadProducts();
  }

  async loadProducts() {
    this.cartService.getCartProducts(this.userId, this.tenant).subscribe({
      next: (userCart) => {
        this.userCart = userCart.contents;
        this.userCart.forEach(async (cartProduct) => {
          this.stockService.getProductInfo(this.tenant, cartProduct.product_id).subscribe({
            next: (product) => {
              product.product_id = cartProduct.product_id;
              this.cartProductsList.push({ product: product, quantity: cartProduct.quantity });
              this.getTotalPrice();
            },
            error: (error) => {
              console.error('Error loading product');
              console.error(error);
            },
          });
        });
        this.getTotalPrice();
      },
      error: (error) => {
        console.error('Error loading products');
      },
    });
  }



  getTotalPrice() {
    //for each item in cart get product info from stock service
    //get price
    //multiply price by quantity
    //sum all prices
    this.cartProductsList.forEach(async (cartProduct) => {
      this.totalPrice = this.totalPrice + (cartProduct.product.price * cartProduct.quantity);
    });
  }

  // async loadProductsDemo() {
  //   const cartProductsList = await this.productsService.getCartProducts();
  //   this.cartProductsList = cartProductsList;
  // }

  // getTotalPriceDemo() {
  //   return this.cartProductsList.reduce((acc, cartProduct) => {
  //     return acc + cartProduct.product.price * cartProduct.quantity;
  //   }, 0);
  // }

  checkout(address: string) {
    if(!address) {
      alert('Please enter an address');
      return;
    }
    this.ordersService.checkout(this.userId, this.tenant, address).subscribe({
      next: (order) => {
        alert('Order placed successfully');
        this.router.navigate([`/${this.tenant}/orders`]); // redirect to orders page
      },
      error: (error) => {
        alert('Failed to place order');
        console.error("Checkout error:", error);
      }
    });
  }

}


