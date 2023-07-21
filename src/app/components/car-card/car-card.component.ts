import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GetCarDTO } from 'src/app/models/car/GetCarDTO';
import { CarService } from 'src/app/services/car.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss'],
})
export class CarCardComponent {
  @Input() car: GetCarDTO | undefined;
  @Input() carUserEmail: string | undefined;
  token = localStorage.getItem('jwtToken');
  userEmail = localStorage.getItem('email');
  constructor(
    private http: HttpClient,
    private carService: CarService,
    private router: Router,
    config: NgbCarouselConfig
  ) {
    config.showNavigationArrows = false;
    config.pauseOnHover = true;
  }

  addToFavorites(carId: number) {
    if (this.token == null) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: ' You must be logged in!',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.carService.AddCarToFavorites(carId).subscribe(
        (response) => {
          if (response.success) {
            console.log(response);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.data,
              showConfirmButton: false,
              timer: 750,
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                location.reload();
              }
            });
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

  onCarClick(carId: number) {
    this.router.navigate(['/cars', carId]);
  }
}
