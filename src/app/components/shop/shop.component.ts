import { Component, inject } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../../classes/product';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  productsList: Product[] = [];
  productsService: ProductsService = inject(ProductsService);
  filteredProducts: Product[] = [];
  tenant: string = '';
  constructor(
    private stockService: StockService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tenant = this.router.url.split('/')[1];
    // this.loadProducts();
    this.loadStockProducts();
  }

  async loadProducts() {
    const productsList = await this.productsService.getAllProducts();
    this.productsList = productsList;
    this.filteredProducts = productsList;
  }

  async loadStockProducts() {
    const productsList = this.stockService.getProducts(this.tenant).subscribe({
      next: (products) => {
        this.productsList = products;
        this.filteredProducts = products;
      },
      error: (error) => {
        console.error('Error loading products');
      },
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredProducts = this.productsList;
      console.log('No text entered');
      return;
    }
    this.filteredProducts = this.productsList.filter((product) =>
      product?.name.toLowerCase().includes(text.toLowerCase()),
    );
    console.log('Filtering results');
    console.log(this.filteredProducts);
  }
}
