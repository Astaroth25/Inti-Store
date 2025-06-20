import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from '../Interfaces/user';
import { UserLoginResponse } from '../Interfaces/userLoginResponse';

export interface Credentials {
  username: string,
  password: string
};

export interface RegisterResponse {
  username: string,
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'https://intistore-backend.vercel.app/user/';
  private http = inject(HttpClient);

  login(credencials: Credentials): Observable<UserLoginResponse> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    };
    return this.http.post<UserLoginResponse>(this.baseURL + 'login', credencials, httpOptions)
  };

  register(user: UserI): Observable<RegisterResponse> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<RegisterResponse>(this.baseURL + 'register', user, httpOptions)
  };

  logout(): Observable<string> {
    return this.http.post(this.baseURL + 'logout', {}, { withCredentials: true,responseType: 'text' });
  }

  checkStatus(): Observable<UserLoginResponse> {
    const httpOptions = { withCredentials: true }
    return this.http.get<UserLoginResponse>(this.baseURL + 'auth/status', httpOptions);
  }
}
