import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Order } from '../../classes/order';


@Component({
  selector: 'app-orders-list-element',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './orders-list-element.component.html',
  styleUrl: './orders-list-element.component.css'
})
export class OrdersListElementComponent {
  @Input() order!: Order;
  tenant: string = '';
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor(
    private router: Router,
  ) {
    this.tenant = this.router.url.split('/')[1];
  }
}
