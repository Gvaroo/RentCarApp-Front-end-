import { Component } from '@angular/core';
import { GetCarDTO } from 'src/app/models/car/GetCarDTO';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-popular-cars',
  templateUrl: './popular-cars.component.html',
  styleUrls: ['./popular-cars.component.scss'],
})
export class PopularCarsComponent {
  cars: GetCarDTO[] = [];

  constructor(public CarService: CarService) {
    this.CarService.getPopularCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
}
