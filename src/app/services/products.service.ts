import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly baseUrl = 'assets/img';
  private products: Product[] = [
    {
      product_id: '1',
      seller_id: '000000000000000000000001',
      name: 'Product 1',
      price: 100,
      description: 'This is a description of product 1',
      image_b64: ''
    },
    {
      product_id: '2',
      seller_id: '000000000000000000000002',
      name: 'Product 2',
      price: 200,
      description: 'This is a description of product 2',
      image_b64: ''
    },
    {
      product_id: '3',
      seller_id: '000000000000000000000003',
      name: 'Product 3',
      price: 300,
      description: 'This is a description of product 3',
      image_b64: ''
    },
    {
      product_id: '4',
      seller_id: '000000000000000000000004',
      name: 'Product 4',
      price: 400,
      description: 'This is a description of product 4',
      image_b64: ''
    },
    {
      product_id: '5',
      seller_id: '000000000000000000000005',
      name: 'Product 5',
      price: 500,
      description: 'This is a description of product 5',
      image_b64: ''
    },
    {
      product_id: '6',
      seller_id: '000000000000000000000006',
      name: 'Product 6',
      price: 600,
      description: 'This is a description of product 6',
      image_b64: ''
    },
    {
      product_id: '7',
      seller_id: '000000000000000000000007',
      name: 'Product 7',
      price: 700,
      description: 'This is a description of product 7',
      image_b64: ''
    },
    {
      product_id: '8',
      seller_id: '000000000000000000000008',
      name: 'Product 8',
      price: 800,
      description: 'This is a description of product 8',
      image_b64: ''
    },
    {
      product_id: '9',
      seller_id: '000000000000000000000009',
      name: 'Product 9',
      price: 900,
      description: 'This is a description of product 9',
      image_b64: ''
    },
    {
      product_id: '10',
      seller_id: '000000000000000000000010',
      name: 'Product 10',
      price: 1000,
      description: 'This is a description of product 10',
      image_b64: ''
    }
  ];

  cartProducts: { product: Product, quantity: number }[] = [
    {
      product: this.products[5],
      quantity: 1
    },
    {
      product: this.products[6],
      quantity: 2
    },
    {
      product: this.products[7],
      quantity: 3
    }
  ];

  private convertImagesToBase64(): void {
    this.products.forEach(product => {
      const imageUrl = `${this.baseUrl}/image${product.product_id}.png`;
      this.getBase64ImageFromUrl(imageUrl).then(base64 => {
        product.image_b64 = base64;
      }).catch(err => {
        console.error('Error converting image to base64', err);
      });
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


  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getCartProducts(): Promise<{ product: Product, quantity: number }[]> {
    return this.cartProducts;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find(product => product.product_id === id);
  }


  constructor(private router: Router) {
    this.convertImagesToBase64();
   }

  async checkout() {
    await this.router.navigate(['/checkout']);
  }

}
