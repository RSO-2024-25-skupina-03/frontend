import { Component, inject } from '@angular/core';
import { CartProductComponent } from "../cart-product/cart-product.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../classes/product';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartProductComponent, CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartProductsList: {product: Product, quantity: number}[] = [];
  cartService: ProductsService = inject(ProductsService);
  filteredProducts: Product[] = [];
  totalPrice: number = 0;
  constructor() {
    this.totalPrice = this.getTotalPrice();
  }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    const cartProductsList = await this.cartService.getCartProducts();
    this.cartProductsList = cartProductsList;
  }

  getTotalPrice() {
    return this.cartProductsList.reduce((acc, cartProduct) => {
      return acc + cartProduct.product.price * cartProduct.quantity;
    }, 0);
  }

  checkout() {
    this.cartService.checkout();
  }

}


