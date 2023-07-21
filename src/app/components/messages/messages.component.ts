import { Component } from '@angular/core';
import { GetNotificationsDTO } from 'src/app/models/user/GetNotificationsDTO';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  notifications: GetNotificationsDTO[] = [];
  constructor(private notificationService: NotificationService) {
    this.getNotifications();
  }
  getNotifications() {
    this.notificationService.getRentNotification().subscribe((response) => {
      this.notifications = response.data;
    });
  }
}
