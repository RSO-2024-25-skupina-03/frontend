import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../classes/product';
import { AuthenticationService } from '../../services/authentication.service';
import { CartService } from '../../services/cart.service';
import { StockService } from '../../services/stock.service';
import { DemoDataService } from '../../services/demo-data.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  tenant: string = '';
  route: ActivatedRoute = inject(ActivatedRoute);
  productsService: ProductsService = inject(ProductsService);
  product: Product = {
    product_id: '',
    seller_id: '',
    name: '',
    price: 0,
    description: '',
    stock: 0,
    image_b64: '',
  };
  userId: string | undefined;
  constructor(
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private router: Router,
    private stockService: StockService,
    private demoDataService: DemoDataService,
  ) {
  }

  ngOnInit() {
    this.tenant = this.router.url.split('/')[1];
    console.log("[details component] tenant: ", this.tenant);
    this.userId = this.authenticationService.getCurrentUser(this.tenant)?._id;
    console.log("[details component] userId: ", this.userId);
    const productId = this.route.snapshot.params['id'];
    // this.productsService.getProductById(productId).then((product) => {
    //   this.product = product;
    // });
    this.stockService.getProductInfo(this.tenant, productId).subscribe({
      next: (product) => {
        this.product = product;
        this.stockService.getProductStock(this.tenant, productId).subscribe({
          next: (stock) => {
            this.product.stock = stock.stock_amount;
            this.demoDataService.getUserNameById(this.tenant, product.seller_id).subscribe({
              next: (sellerName) => {
                this.product.seller_name = sellerName;
              },
              error: (error) => {
                console.error('Error loading seller name');
                console.error(error);
              },
            });
          },
          error: (error) => {
            console.error('Error loading stock');
            console.error(error);
          },
        });
      },
      error: (error) => {
        console.error('Error loading product');
        console.error(error);
      },
    });
  }

  addToCart(): void {
    if (!this.userId) {
      alert('Please log in to add products to your cart.');
    } else if (this.product && this.product.product_id) {
      this.cartService.addToCart(this.userId, this.product.product_id, this.tenant).subscribe({
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
