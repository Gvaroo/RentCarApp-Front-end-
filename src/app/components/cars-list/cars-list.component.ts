import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetCarDTO } from 'src/app/models/car/GetCarDTO';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
})
export class CarsListComponent {
  cars: GetCarDTO[] = [];

  constructor(private CarService: CarService, private router: Router) {
    this.CarService.GetAllCars().subscribe((response) => {
      this.cars = response.data;
    });
  }
  openFilter() {
    this.router.navigate(['/Filter']);
  }
}
