import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckNewUserRentNotificationsDTO } from 'src/app/models/user/CheckNewUserRentNotificationsDTO';
import { GetUserDTO } from 'src/app/models/user/GetUserDTO';
import { AuthService } from 'src/app/services/auth.service';
import { BalanceService } from 'src/app/services/balance.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  sidebarOpen = false;
  showNotifications: boolean = false;
  hasNewNotifications: boolean = false;
  showModal: boolean = false;
  amount: number = 0;
  user: GetUserDTO | undefined;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  constructor(
    public AuthService: AuthService,
    private notificationService: NotificationService,
    private balanceService: BalanceService,
    private router: Router
  ) {
    this.getNotifications();
    const email = localStorage.getItem('email') || '';
    if (email != '') {
      this.AuthService.getUser(email).subscribe(
        (response) => {
          if (response.success) {
            this.user = response.data;
          } else {
            console.error(response.message);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  goToAddCarPage() {
    if (this.user?.isVerified) this.router.navigate(['/CarAdd']);
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title:
          'Please verify your email to be able to add a car to the website!',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
  getNotifications() {
    this.notificationService
      .checkNewRentNotifications()
      .subscribe((response) => {
        this.checkNewNotification(response.data);
      });
  }
  checkNewNotification(notification: CheckNewUserRentNotificationsDTO[]) {
    for (var item of notification) {
      if (!item.isRead) this.hasNewNotifications = true;
    }
  }
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (!this.showNotifications) this.hasNewNotifications = false;
  }
  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  addAmount() {
    this.balanceService.addBalance(this.amount).subscribe((response) => {
      console.log(response.data);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: response.data,
        showConfirmButton: false,
        timer: 500,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          this.closeModal();
          this.amount = 0;
          location.reload();
        }
      });
    });
  }
}
