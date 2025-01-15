import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css'
})
export class CartProductComponent {
  @Input() cartProduct!: {product: Product, quantity: number};
}
