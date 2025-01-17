import { Component } from '@angular/core';
import { Notification } from '../../classes/notification';
import { NotificationsService } from '../../services/notifications.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notifications: Notification[] = [];
  userId: string = '';
  tenant: string = '';
  constructor(
    private notificationsService: NotificationsService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ){}

  ngOnInit() {
    this.tenant = this.router.url.split('/')[1];
    this.userId = this.authenticationService.getCurrentUser(this.tenant)?._id || '';
    if(!this.userId) {
      alert('Please login to view your notifications');
    }
    this.notificationsService.getNotifications(this.userId, this.tenant).subscribe({
      next: (notifications) => {
        this.notifications = notifications;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
      }
    });
  }
}
