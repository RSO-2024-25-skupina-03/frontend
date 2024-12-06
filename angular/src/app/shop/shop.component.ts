import { Component, inject } from '@angular/core';
import { ProductComponent } from "../product/product.component";
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { CommonModule } from '@angular/common';

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
  constructor() {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    const productsList = await this.productsService.getAllProducts();
    this.productsList = productsList;
    this.filteredProducts = productsList;
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
