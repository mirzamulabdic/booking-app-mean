import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth-data.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export function getUserId() {
  return localStorage.getItem('userId');
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token!: string;
  private tokenTimer!: any;
  private authStatusListener = new Subject<boolean>();
  private userIdListener = new Subject<any>();
  private userId!: string;

  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserIdListener() {
    return this.userIdListener.asObservable();
  }

  getUserData(): Observable<string> {
    return this.userIdListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  createUser(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    const authData: AuthData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe((res) => {
        this.router.navigate(['/login']);
      });
  }
  login(email: string, password: string) {
    const authData: AuthData = {
      firstname: '',
      lastname: '',
      email: email,
      password: password,
    };
    this.http
      .post<{
        token: string;
        expiresIn: number;
        userId: string;
        firstname: string;
        lastname: string;
      }>('http://localhost:3000/api/user/login', authData)
      .subscribe((res) => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.userId = res.userId;

          const now = new Date();
          const expDate = new Date(now.getTime() + expiresInDuration * 1000);

          this.saveAuthData(token, expDate, res.userId);
          this.router.navigate(['/']);
        }
      });
  }

  setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo!.expDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo!.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null!;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expDate = localStorage.getItem('expiration');
    if (!token || !expDate) {
      return;
    }
    return {
      token: token,
      expDate: new Date(expDate),
    };
  }
}
