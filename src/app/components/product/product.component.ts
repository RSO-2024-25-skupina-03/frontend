import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
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
  constructor(
    private router: Router,
  ) {
    this.tenant = this.router.url.split('/')[1];
  }
  addToCart(event: Event): void {
    event.stopPropagation();
    // Add your logic to handle the button click here
    console.log('Button clicked, but no redirect');
  }
}
