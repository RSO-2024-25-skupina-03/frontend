import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DemoDataService } from './demo-data.service';
import { catchError, forkJoin, map, Observable, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly stockUrl = environment.stockServiceUrl;
  constructor(
      private http: HttpClient,
      private demoDataService: DemoDataService,
      private authenticationService: AuthenticationService,
    ) { }
  
    public generateTestData(tenant: string): Observable<string> {
      const token = this.authenticationService.getToken(tenant);
      const headers = { Authorization: `Bearer ${token}` };
      const url = `${this.stockUrl}/${tenant}/generate_test_data`
      console.log("generating test data..." + url);
      return this.http.post<string>(url, { headers })
        .pipe(catchError(this.demoDataService.handleError))
        ;
    }

    public getProductsIds(tenant: string): Observable<string[]> {
      /*response body: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]*/
      const url = `${this.stockUrl}/${tenant}/ids`;
      console.log("fetching product IDs..." + url);
      return this.http.get<string[]>(url)
        .pipe(catchError(this.demoDataService.handleError))
        ;
    }

    public getProductStock(tenant: string, id: string): Observable<{pruduct_id: string, stock_amount: number}> {
      /*
      {
  "product_id": "1",
  "stock_amount": 10
}
      */
      const url = `${this.stockUrl}/${tenant}/stock/${id}`;
      console.log("fetching product stock..." + url);
      return this.http.get<{pruduct_id: string, stock_amount: number}>(url)
        .pipe(catchError(this.demoDataService.handleError))
        ;
    }

    public getProductInfo(tenant: string, id: string): Observable<Product> {
      /*
      {
  "product_id": "1",
  "seller_id": "2",
  "name": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "image_b64": "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkJCg...
}
      */
      const url = `${this.stockUrl}/${tenant}/info/${id}`;
      console.log("fetching product..." + url);
      return this.http.get<Product>(url)
        .pipe(catchError(this.demoDataService.handleError))
        ;

    }

    public getProducts(tenant: string): Observable<Product[]> {
      return this.getProductsIds(tenant)
        .pipe(
          switchMap((ids) => {
            return forkJoin(ids.map((id) => {
              return this.getProductInfo(tenant, id)
                .pipe(
                  switchMap((product) => {
                    return this.getProductStock(tenant, product.product_id)
                      .pipe(
                        map((stock) => {
                          product.stock = stock.stock_amount;
                          return product;
                        })
                      );
                  })
                );
            }));
          })
        );
    }
}
