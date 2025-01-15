import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Product } from '../../classes/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() product!: Product;
  addToCart(event: Event): void {
    event.stopPropagation();
    // Add your logic to handle the button click here
    console.log('Button clicked, but no redirect');
  }
}
