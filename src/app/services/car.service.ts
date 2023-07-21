import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddCarDTO } from '../models/car/AddCarDTO';
import { RentCarDTO } from '../models/car/RentCarDTO';
import { FilterDTO } from '../models/car/FilterDTO';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:7136/api/Car';

  GetBrandsAndModels(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetBrandsAndModels`);
  }
  GetTransmissions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetTransmissions`);
  }
  addCar(car: AddCarDTO): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(`${this.apiUrl}/AddCar`, car, {
      headers,
    });
  }
  getPopularCars(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetPopularCars`);
  }
  GetAllCars(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/GetAllCars`);
  }
  GetUserLikedCars(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('email') ?? '';
    const params = { email };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/GetUserLikedCars`, {
      headers,
      params,
    });
  }
  RentCar(rentCar: RentCarDTO): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(`${this.apiUrl}/RentCar`, rentCar, {
      headers,
    });
  }
  getRentedCars(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('email') ?? '';
    const params = { email };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/GetUserRentedCars`, {
      headers,
      params,
    });
  }

  AddCarToFavorites(carId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('email') ?? '';
    const params = { email, carId };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(`${this.apiUrl}/AddCarToFavorites`, null, {
      headers,
      params,
    });
  }
  UnlikeCarFromFavorites(carId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('email') ?? '';
    const params = { email, carId };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.apiUrl}/UnlikeCar`, {
      headers,
      params,
    });
  }
  GetCarById(carId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/GetCar`, {
      headers,
      params: { carId },
    });
  }

  FilterCar(filter: FilterDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/FilterCars`, filter);
  }
  getUserAddedCars(): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('email') ?? '';
    const params = { email };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/GetUserAddedCars`, {
      headers,
      params,
    });
  }
  deleteCar(carId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const params = { carId };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<any>(`${this.apiUrl}/RemoveCar`, {
      headers,
      params,
    });
  }
}
