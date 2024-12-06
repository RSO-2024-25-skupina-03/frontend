import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productsService: ProductsService = inject(ProductsService);
  product: Product | undefined;
  constructor() {}

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.productsService.getProductById(productId).then((product) => {
      this.product = product;
    });
  }
}
