import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

export interface User {
  name?: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  id?: string;
}

interface RegisterApiResponse {
  successful: boolean;
  errors: string[];
}

interface LoginApiResponse {
  successful: boolean;
  result: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:4000';
  private isAuthorised$$ = new BehaviorSubject<boolean>(false);

  isAuthorised$ = this.isAuthorised$$.asObservable();

  constructor(private http: HttpClient, private sessionStorage: SessionStorageService) {}

  login(user: User) {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post<LoginApiResponse>(`${this.baseUrl}/login`, user).pipe(
      tap(response => {
        if (response.successful && response.result) {
          this.sessionStorage.setToken(response.result);
          this.isAuthorised = true;
        }
      })
    );
  }

  logout() {
    // Add your code here
    const headers = new HttpHeaders({
      Authorization: `${this.sessionStorage.getToken()}`,
    });

    return this.http.delete<void>(`${this.baseUrl}/logout`, { headers }).pipe(
      tap(() => {
        this.sessionStorage.deleteToken();
        this.isAuthorised = false;
      })
    );
  }

  register(user: User) {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post<RegisterApiResponse>(`${this.baseUrl}/register`, user);
  }

  get isAuthorised() {
    // Add your code here. Get isAuthorized$$ value
    return this.isAuthorised$$.getValue();
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
    this.isAuthorised$$.next(value);
  }

  getLoginUrl() {
    // Add your code here
  }
}
