import { Injectable } from '@angular/core';
import { Product } from './product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly baseUrl = 'assets/img';
  products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      price: 100,
      description: 'This is a description of product 1',
      imageUrl: `${this.baseUrl}/image1.png`,
      stock: 10,
      sellerId: '1'
    },
    {
      id: '2',
      name: 'Product 2',
      price: 200,
      description: 'This is a description of product 2',
      imageUrl: `${this.baseUrl}/image2.png`,
      stock: 20,
      sellerId: '2'
    },
    {
      id: '3',
      name: 'Product 3',
      price: 300,
      description: 'This is a description of product 3',
      imageUrl: `${this.baseUrl}/image3.png`,
      stock: 30,
      sellerId: '3'
    },
    {
      id: '4',
      name: 'Product 4',
      price: 400,
      description: 'This is a description of product 4',
      imageUrl: `${this.baseUrl}/image4.png`,
      stock: 40,
      sellerId: '4'
    },
    {
      id: '5',
      name: 'Product 5',
      price: 500,
      description: 'This is a description of product 5',
      imageUrl: `${this.baseUrl}/image5.png`,
      stock: 50,
      sellerId: '5'
    },
    {
      id: '6',
      name: 'Product 6',
      price: 600,
      description: 'This is a description of product 6',
      imageUrl: `${this.baseUrl}/image6.png`,
      stock: 60,
      sellerId: '6'
    },
    {
      id: '7',
      name: 'Product 7',
      price: 700,
      description: 'This is a description of product 7',
      imageUrl: `${this.baseUrl}/image7.png`,
      stock: 70,
      sellerId: '7'
    },
    {
      id: '8',
      name: 'Product 8',
      price: 800,
      description: 'This is a description of product 8',
      imageUrl: `${this.baseUrl}/image8.png`,
      stock: 80,
      sellerId: '8'
    },
    {
      id: '9',
      name: 'Product 9',
      price: 900,
      description: 'This is a description of product 9',
      imageUrl: `${this.baseUrl}/image9.png`,
      stock: 90,
      sellerId: '9'
    },
    {
      id: '10',
      name: 'Product 10',
      price: 1000,
      description: 'This is a description of product 10',
      imageUrl: `${this.baseUrl}/image10.png`,
      stock: 100,
      sellerId: '10'
    }
  ]

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


  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getCartProducts(): Promise<{ product: Product, quantity: number }[]> {
    return this.cartProducts;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find(product => product.id === id);
  }


  constructor(private router: Router) { }

  async checkout() {
    await this.router.navigate(['/checkout']);
  }

}
