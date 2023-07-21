import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { GetCarDTO } from 'src/app/models/car/GetCarDTO';
import { CarService } from 'src/app/services/car.service';
import Swal from 'sweetalert2';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-unlike-car-card',
  templateUrl: './unlike-car-card.component.html',
  styleUrls: ['./unlike-car-card.component.scss'],
})
export class UnlikeCarCardComponent {
  @Input() car: GetCarDTO | undefined;
  @Input() carUserEmail: string | undefined;
  token = localStorage.getItem('jwtToken');
  userEmail = localStorage.getItem('email');
  constructor(
    public router: Router,
    private carService: CarService,
    config: NgbCarouselConfig
  ) {
    config.showNavigationArrows = false;
    config.pauseOnHover = true;
  }

  unlikeCar(carId: number) {
    this.carService.UnlikeCarFromFavorites(carId).subscribe(
      (response) => {
        if (response.success) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.data,
            showConfirmButton: false,
            timer: 750,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              this.refreshPage();
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
  onCarClick(carId: number) {
    this.router.navigate(['/cars', carId]);
  }
  refreshPage() {
    // Refresh the page
    location.reload();
  }
}
