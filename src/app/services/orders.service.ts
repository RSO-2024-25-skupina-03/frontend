import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DemoDataService } from './demo-data.service';
import { AuthenticationService } from './authentication.service';
import { Order } from '../classes/order';
import { catchError, Observable } from 'rxjs';
import OrderResponse from '../classes/order-response';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly ordersUrl = environment.ordersServiceUrl;
    constructor(
      private http: HttpClient,
      private demoDataService: DemoDataService,
      private authenticationService: AuthenticationService
    ) { }

  public getOrdersSeller(userId: string, tenant: string): Observable<Order[]> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Order[]>(`${this.ordersUrl}/${tenant}/vendor_orders/${userId}`, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }

  public getOrdersBuyer(userId: string, tenant: string): Observable<Order[]> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Order[]>(`${this.ordersUrl}/${tenant}/buyer_orders/${userId}`, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }

  public createOrder(tenant: string, order: Order): Observable<OrderResponse> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<OrderResponse>(`${this.ordersUrl}/${tenant}/order`, order, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }

  public updateOrder(tenant: string, order: Order, order_id: string): Observable<OrderResponse> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<OrderResponse>(`${this.ordersUrl}/${tenant}/order/${order_id}`, order, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }

  public checkout(userId: string, tenant: string): Observable<OrderResponse> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<OrderResponse>(`${this.ordersUrl}/${tenant}/checkout/${userId}`, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }

  public getOrderById(tenant: string, orderId: string): Observable<Order> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Order>(`${this.ordersUrl}/${tenant}/order/${orderId}`, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }
}
