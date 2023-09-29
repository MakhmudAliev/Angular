import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    // Add your code here
    this.userService.getUser().subscribe({
      next: resp => {
        this.isAdmin = resp.result.role === 'admin';
      },
      error: err => {
        console.log('err:', err);
      },
    });
  }

  get isAdmin() {
    // Add your code here. Get isAdmin$$ value
    return this.isAdmin$$.getValue();
  }

  set isAdmin(value: boolean) {
    // Add your code here. Change isAdmin$$ value
    this.isAdmin$$.next(value);
  }
}
