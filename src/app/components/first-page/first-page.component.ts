import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-page',
  standalone: true,
  imports: [],
  templateUrl: './first-page.component.html',
  styleUrl: './first-page.component.css'
})
export class FirstPageComponent {
  constructor(private router: Router) {}

  selectTenant(tenant: string) {
    this.router.navigate([`/${tenant}`]);
  }
}
