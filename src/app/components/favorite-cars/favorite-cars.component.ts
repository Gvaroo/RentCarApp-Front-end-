import { Component } from '@angular/core';
import { GetCarDTO } from 'src/app/models/car/GetCarDTO';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-favorite-cars',
  templateUrl: './favorite-cars.component.html',
  styleUrls: ['./favorite-cars.component.scss'],
})
export class FavoriteCarsComponent {
  cars: GetCarDTO[] = [];

  constructor(public CarService: CarService) {
    this.CarService.GetUserLikedCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
}
