import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SendRentNotificationDTO } from '../models/user/SendRentNotificationDTO';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:7136/api/Notification';

  sendRentNotification(notification: SendRentNotificationDTO): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(
      `${this.apiUrl}/SendRentNotification`,
      notification,
      {
        headers,
      }
    );
  }

  getRentNotification(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('email') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(
      `${this.apiUrl}/GetUserRentNotifications/?userEmail=${email}`,
      { headers }
    );
  }
  checkNewRentNotifications(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('email') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(
      `${this.apiUrl}/CheckNewRentNotifications/?userEmail=${email}`,
      { headers }
    );
  }
}
