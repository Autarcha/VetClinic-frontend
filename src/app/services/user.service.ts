import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { apiUrl } from '../app.module';
import { User } from '../models/userModel';
import { AuthResult } from './authModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = new BehaviorSubject<User | null>(null);

  getUser(id: number) {
    return this.httpClient.get<User>(apiUrl + '/user/' + id);
  }

  loginUser(email: string, password: string) {
    return this.httpClient
      .post<AuthResult>(
        apiUrl + '/User/login',
        { email: email, password: password },
        { observe: 'response' }
      )
      .pipe(
        tap((responseData) => {
          if (
            responseData.body !== null &&
            responseData.headers.get('authtoken') !== null
          ) {
            const user = new User(
              responseData.body.role,
              responseData.body.name,
              responseData.body.email,
              responseData.headers.get('authtoken')!
            );
            this.currentUser.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
          }
        })
      );
  }
  logoutUser() {
    this.currentUser.next(null);
    localStorage.removeItem('userData');
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) return;
    const userData: {
      email: string;
      name: string;
      role: number;
      token: string;
    } = JSON.parse(userDataString);
    if (!userData) return;
    const loadedUser = new User(
      userData.role,
      userData.name,
      userData.email,
      userData.token
    );
    this.currentUser.next(loadedUser);
  }

  constructor(private httpClient: HttpClient) {}
}
