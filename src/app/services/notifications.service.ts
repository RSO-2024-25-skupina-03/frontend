import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { DemoDataService } from './demo-data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable } from 'rxjs';
import { Notification } from '../classes/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private readonly notifUrl = environment.notificationsUrl;
  constructor(
    private http: HttpClient,
    private demoDataService: DemoDataService,
    private authenticationService: AuthenticationService
  ) { }

  public getNotifications(userId: string, tenant: string): Observable<Notification[]> {
    const token = this.authenticationService.getToken(tenant);
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Notification[]>(`${this.notifUrl}/${tenant}/notifications/${userId}`, { headers })
      .pipe(catchError(this.demoDataService.handleError))
      ;
  }
}
