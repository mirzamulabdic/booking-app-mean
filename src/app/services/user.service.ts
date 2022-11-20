import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  favorites!: string[];

  getUserInfo(userId: string) {
    return this.http.get<{ firstname: string; lastname: string }>(
      'http://localhost:3000/api/user/' + userId
    );
  }
}
