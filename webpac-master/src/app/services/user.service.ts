// src/app/services/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://localhost:9000/User';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.baseUrl}/`);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/Login`, { email, password });
  }
}
