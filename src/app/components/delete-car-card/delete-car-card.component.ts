import { Component, Input } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GetCarDTO } from 'src/app/models/car/GetCarDTO';
import { CarService } from 'src/app/services/car.service';
import Swal from 'sweetalert2';
import { register } from 'swiper/element';

@Component({
  selector: 'app-delete-car-card',
  templateUrl: './delete-car-card.component.html',
  styleUrls: ['./delete-car-card.component.scss'],
})
export class DeleteCarCardComponent {
  @Input() car: GetCarDTO | undefined;
  constructor(private carService: CarService, config: NgbCarouselConfig) {
    config.showNavigationArrows = false;
    config.pauseOnHover = true;
  }

  deleteCar(carId: number) {
    Swal.fire({
      title: 'Delete car?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carService.deleteCar(carId).subscribe(
          (response) => {
            if (response.success) {
              location.reload();
            }
          },
          (error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: error.error.message,
              showConfirmButton: false,
              timer: 800,
            });
          }
        );
      }
    });
  }
  addToFavorites(carId: number) {
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
