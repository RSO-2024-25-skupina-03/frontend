import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Order } from '../classes/order';
import OrderResponse from '../classes/order-response';
import { DemoDataService } from './demo-data.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly ordersUlr = environment.ordersServiceUrl;

  public createOrder(order: Order): Observable<OrderResponse> {
    const url: string = `${this.ordersUlr}/order`;
    return this.http.post<OrderResponse>(url, order)
    .pipe(catchError(this.demoDataService.handleError));
  }
  constructor(
    private demoDataService: DemoDataService,
    private http: HttpClient
  ) { }
}
