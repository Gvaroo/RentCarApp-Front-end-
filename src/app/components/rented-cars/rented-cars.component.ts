import { Component } from '@angular/core';
import { GetRentedCarDTO } from 'src/app/models/car/GetRentedCarDTO';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-rented-cars',
  templateUrl: './rented-cars.component.html',
  styleUrls: ['./rented-cars.component.scss'],
})
export class RentedCarsComponent {
  rentedCars: GetRentedCarDTO[] | undefined;
  constructor(private carService: CarService) {
    this.carService.getRentedCars().subscribe(
      (response) => {
        this.rentedCars = response.data;
      },
      (error) => {
        console.error(error.message);
      }
    );
  }
}
