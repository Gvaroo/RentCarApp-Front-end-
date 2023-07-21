import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:7136/api/Balance';

  addBalance(amount: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const email = localStorage.getItem('email') ?? '';
    const params = { email, amount };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<any>(`${this.apiUrl}/AddBalance`, null, {
      headers,
      params,
    });
  }
}
