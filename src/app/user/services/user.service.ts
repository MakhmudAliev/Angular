import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/auth/services/auth.service';

interface UserResponse {
  successful: boolean;
  result: User;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getUser() {
    // Add your code here
    return this.http.get<UserResponse>(`${this.baseUrl}/users/me`);
  }
}
