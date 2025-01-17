import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DemoDataService } from './demo-data.service';
import { AuthenticationService } from './authentication.service';
import { Cart } from '../classes/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartUrl = environment.cartServiceUrl;
  constructor(
    private http: HttpClient,
    private demoDataService: DemoDataService,
    private authenticationService: AuthenticationService
  ) { }

  public addToCart(userId: string, productId: string, tenant: string): Observable<string> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<string>(`${this.cartUrl}/${tenant}/cart/${userId}/${productId}`, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }

  public removeFromCart(userId: string, productId: string, tenant: string): Observable<string> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<string>(`${this.cartUrl}/${tenant}/cart/${userId}/${productId}`, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }

  public deleteFromCart(userId: string, productId: string, tenant: string): Observable<string> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete<string>(`${this.cartUrl}/${tenant}/cart/${userId}/${productId}`, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }

  public getCartProducts(userId: string, tenant: string): Observable<Cart> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Cart>(`${this.cartUrl}/${tenant}/cart/${userId}`, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }
}
