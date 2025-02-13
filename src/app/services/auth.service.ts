
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  isAuthenticated$(): Observable<boolean> {
    return this.authState.asObservable();
  }

  loginMock() {
    localStorage.setItem('token', 'mock_token');
    this.authState.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
  }
}
