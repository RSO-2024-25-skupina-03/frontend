import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HistoryService } from '../../services/history.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-framework',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './framework.component.html',
  styleUrl: './framework.component.css'
})
export class FrameworkComponent {
  tenant: string = '';

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly historyService: HistoryService,
    private readonly router: Router,
  ) {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      const match = url.match(/^\/([^\/]+)/);
      this.tenant = match ? match[1] : '';
    });
  }
public logout(): void {
this.authenticationService.logout(this.tenant);
}
public isLoggedIn(): boolean {
return this.authenticationService.isLoggedIn(this.tenant);
}
public getCurrentUser(): string {
const user: User | null = this.authenticationService.getCurrentUser(this.tenant);
return user && user.name ? user.name : "Guest";
}
public isAdmin(): boolean {
const user: User | null = this.authenticationService.getCurrentUser(this.tenant);
return user && user.type === "admin";
}
}
