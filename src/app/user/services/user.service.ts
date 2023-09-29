import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { UserApiResponse } from '../model/user-api-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getUser() {
    // Add your code here
    return this.http.get<UserApiResponse>(`${this.baseUrl}/users/me`);
  }
}
