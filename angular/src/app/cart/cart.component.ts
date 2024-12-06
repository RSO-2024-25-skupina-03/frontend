import { Component, inject } from '@angular/core';
import { CartProductComponent } from "../cart-product/cart-product.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../product';
import { ProductsService } from '../products.service';


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
  constructor() {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    const cartProductsList = await this.cartService.getCartProducts();
    this.cartProductsList = cartProductsList;
  }

}


