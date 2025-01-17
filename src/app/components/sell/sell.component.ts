import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent {
  tenant: string = '';
  seller_id: string = '';
  name: string = '';
  price: number = 0;
  description: string = '';
  image_b64: string = '';
  image_num: number = 1;
  stock: number = 0;
  formError: string = '';
  constructor(
    private router: Router,
    private stockService: StockService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.tenant = this.router.url.split('/')[1];
    this.seller_id = this.authenticationService.getCurrentUser(this.tenant)?._id || '';
    if (!this.seller_id) {
      alert('Please login to sell products');
    }
  }

  async onSellSubmit() {
    if (!this.name || !this.price || !this.description || !this.stock) {
      this.formError = 'Please fill all fields';
      return;
    }
    // add image
    const imageUrl = `assets/img/image${this.image_num}.png`; // Replace with your image path
    this.image_b64 = await this.getBase64ImageFromUrl(imageUrl);
    const product_id = this.name.toLowerCase().replace(/ /g, '-');
    this.stockService.addProduct(this.tenant, {
      product_id: product_id,
      seller_id: this.seller_id,
      name: this.name,
      price: this.price,
      description: this.description,
      image_b64: this.image_b64
    }).subscribe({
      next: (product) => {
        console.log('Product added:', product);
        if(!product.product_id) {
          this.formError = 'Error adding product: no product_id';
          return;
        }
        this.stockService.changeStock(this.tenant, product.product_id, this.stock).subscribe({
          next: (stock) => {
            console.log('Stock changed:', stock);
            alert('Product added successfully');
            this.router.navigate([`/${this.tenant}/`]);
          },
          error: (error) => {
            console.error('Error changing stock:', error);
            this.formError = 'Error changing stock';
          }
        });
      },
      error: (error) => {
        console.error('Error adding product:', error);
        this.formError = 'Error adding product';
      }
    });
  }

  private async getBase64ImageFromUrl(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

// {
//   "product_id": "string",
//   "seller_id": "string",
//   "name": "string",
//   "price": 0,
//   "description": "string",
//   "image_b64": "string"
// }