import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../classes/product';
import { AuthenticationService } from '../../services/authentication.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productsService: ProductsService = inject(ProductsService);
  product: Product | undefined;
  userId: string | undefined;
  constructor(
    private authenticationService: AuthenticationService,
    private cartService: CartService,
  ) {
    this.userId = this.authenticationService.getCurrentUser()?._id;
  }

  ngOnInit() {
    const productId = this.route.snapshot.params['id'];
    this.productsService.getProductById(productId).then((product) => {
      this.product = product;
    });
  }

  addToCart(): void {
    if (!this.userId) {
      alert('Please log in to add products to your cart.');
    } else if (this.product) {
      this.cartService.addToCart(this.userId, this.product.id).subscribe({
       next: () => {
        alert('Product added to cart');
       },
       error: (error) => {
        alert('Failed to add product to cart');
        console.error(error);
       }  
      });
    }
  }
}
