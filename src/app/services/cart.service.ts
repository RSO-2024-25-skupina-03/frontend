import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DemoDataService } from './demo-data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartUrl = environment.cartServiceUrl;
  constructor(
    private http: HttpClient,
    private demoDataService: DemoDataService
  ) { }

  public addToCart(userId: string, productId: string): Observable<string> {
    return this.http.post<string>(`${this.cartUrl}/cart/${userId}/${productId}`, { productId })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }
}
