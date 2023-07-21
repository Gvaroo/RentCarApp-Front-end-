import { Component } from '@angular/core';
import { GetCarDTO } from 'src/app/models/car/GetCarDTO';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-user-added-cars',
  templateUrl: './user-added-cars.component.html',
  styleUrls: ['./user-added-cars.component.scss'],
})
export class UserAddedCarsComponent {
  cars: GetCarDTO[] = [];

  constructor(private carService: CarService) {
    this.carService.getUserAddedCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
}
