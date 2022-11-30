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
          console.log(responseData.body);
          console.log(responseData.headers);
          if (
            responseData.body !== null &&
            responseData.headers.get('AuthToken') !== null
          ) {
            const user = new User(
              responseData.body.role,
              responseData.body.name,
              responseData.body.email,
              responseData.headers.get('AuthToken')!
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
  constructor(private httpClient: HttpClient) {}
}
