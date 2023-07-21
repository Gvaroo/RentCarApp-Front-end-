import { Component } from '@angular/core';
import { FilterDTO } from 'src/app/models/car/FilterDTO';
import { GetBrandDTO } from 'src/app/models/car/GetBrandDTO';
import { GetCarDTO } from 'src/app/models/car/GetCarDTO';
import { CarService } from 'src/app/services/car.service';
import { LabelType, Options } from 'ngx-slider-v2';

@Component({
  selector: 'app-filter-cars',
  templateUrl: './filter-cars.component.html',
  styleUrls: ['./filter-cars.component.scss'],
})
export class FilterCarsComponent {
  cars: GetCarDTO[] = [];
  brands: GetBrandDTO[] = [];
  filter: FilterDTO = {};
  cities: string[] = [];
  startYears: number[] = [];
  endYears: number[] = [];
  capacityOptions: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  minPrice: number = 0;
  maxPrice: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    },
  };

  constructor(public CarService: CarService) {
    this.CarService.GetAllCars().subscribe((response) => {
      this.cars = response.data;
      this.getCities();
    });
    this.getBrands();
    this.startYears = this.generateYearRange(1980, 2023);
    this.endYears = this.generateYearRange(1980, 2023);
  }
  getBrands() {
    this.CarService.GetBrandsAndModels().subscribe(
      (response) => {
        if (response.success) {
          this.brands = response.data;
        } else {
          console.error(response.message);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  generateYearRange(start: number, end: number): number[] {
    const years = [];
    for (let year = start; year <= end; year++) {
      years.push(year);
    }
    return years;
  }
  applyFilter() {
    this.filter.minPrice = this.minPrice;
    this.filter.maxPrice = this.maxPrice;
    console.log(this.filter);
    this.CarService.FilterCar(this.filter).subscribe((response) => {
      this.cars = response.data;
    });
  }
  getCities() {
    for (var item of this.cars) {
      var lowercaseCity = item.city.toLowerCase();
      if (!this.cities.some((city) => city.toLowerCase() === lowercaseCity)) {
        this.cities.push(item.city);
      }
    }
  }
}
