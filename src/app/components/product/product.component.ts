import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
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
  tenant: string = '';
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    this.tenant = this.route.snapshot.params['tenant'];
  }
  addToCart(event: Event): void {
    event.stopPropagation();
    // Add your logic to handle the button click here
    console.log('Button clicked, but no redirect');
  }
}
