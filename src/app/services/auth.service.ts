import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { UserRegisterDTO } from '../models/user/UserRegisterDTO';
import { UserLoginDTO } from '../models/user/UserLoginDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://localhost:7136/api/Auth';

  register(user: UserRegisterDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Register`, user);
  }

  login(user: UserLoginDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Login`, user).pipe(
      tap((response) => {
        if (response.data.ipVerified) {
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('email', response.data.email);
        }
      })
    );
  }

  getUser(email: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/GetUser/${email}`, {
      headers,
    });
  }
  sendEmailConfirmationToken(token: string): Observable<any> {
    const params = new HttpParams().set('token', token);
    return this.http.post<any>(`${this.apiUrl}/VerifyUserEmail`, null, {
      params,
    });
  }
  VerifyUserCode(code: string): Observable<any> {
    const params = new HttpParams().set('code', code);
    return this.http.post<any>(`${this.apiUrl}/VerifyUserCode`, null, {
      params,
    });
  }

  //
  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return token !== null;
  }

  //Checks if token is expired or not
  public isTokenExpired(): boolean {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const tokenData = this.parseToken(token);
      const now = new Date().getTime() / 1000; // Current time in seconds
      return tokenData.exp < now;
    }
    return true; // Token doesn't exist or expired
  }

  private parseToken(token: string): { exp: number } {
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      return { exp: payload.exp };
    }
    return { exp: 0 }; // Invalid token format, consider it expired
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('email');
    location.reload();
  }
}
