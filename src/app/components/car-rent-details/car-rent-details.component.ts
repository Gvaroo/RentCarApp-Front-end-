import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCarDTO } from 'src/app/models/car/GetCarDTO';
import { RentCarDTO } from 'src/app/models/car/RentCarDTO';
import { GetUserDTO } from 'src/app/models/user/GetUserDTO';
import { SendRentNotificationDTO } from 'src/app/models/user/SendRentNotificationDTO';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-rent-details',
  templateUrl: './car-rent-details.component.html',
  styleUrls: ['./car-rent-details.component.scss'],
})
export class CarRentDetailsComponent {
  car: GetCarDTO | undefined;
  multiplier: number = 1;
  userEmail: string = localStorage.getItem('email') || '';
  rentCar: RentCarDTO | undefined;
  notification: SendRentNotificationDTO | undefined;
  user: GetUserDTO | undefined;
  OwnerEmail: string = '';
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private carService: CarService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    if (this.userEmail != '') {
      this.authService.getUser(this.userEmail).subscribe(
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

  ngOnInit() {
    const carIdString = this.route.snapshot.paramMap.get('id');
    if (carIdString) {
      const carId = +carIdString;
      this.getCarDetails(carId);
    }
  }

  getCarDetails(carId: number) {
    this.carService.GetCarById(carId).subscribe(
      (response) => {
        this.car = response.data;
        this.OwnerEmail = this.car?.userEmail ?? '';
        console.log(this.car);
      },
      (error: any) => {
        console.error('Error retrieving car', error);
      }
    );
  }

  BuyCar() {
    this.rentCar = {
      carId: this.car?.id || 0,
      userEmail: this.userEmail,
      rentDays: this.multiplier,
      price: (this.car?.price || 0) * this.multiplier,
    };

    if (this.user?.isVerified) {
      this.carService.RentCar(this.rentCar).subscribe(
        (response) => {
          if (response.success) {
            this.sendNotification();
          } else {
            console.error(response.message);
          }
        },
        (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please verify your email to be able to rent a car!',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
  sendNotification() {
    this.notification = {
      carId: this.rentCar?.carId ?? 0,
      userEmail: this.OwnerEmail,
      rentDays: this.rentCar?.rentDays ?? 0,
    };
    this.notificationService.sendRentNotification(this.notification).subscribe(
      (response) => {
        if (response.success) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Car was rented!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/']);
        }
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
}
