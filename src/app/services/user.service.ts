import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { apiUrl } from '../app.module';
import { AppUser } from '../models/appUserModel';
import { AuthResult } from './authModel';
import { Router } from '@angular/router';
import { UserProfile } from '../models/userProfileModel';
import { UserChangePassword } from '../models/userChangePasswordModel';
import { UserDetails } from '../models/userDetailsModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = new BehaviorSubject<AppUser | null>(null);

  getAllUsers() {
    return this.httpClient.get<UserDetails[]>(apiUrl + '/Users');
  }

  registerUser(userRegister: UserDetails) {
    return this.httpClient.post<UserDetails>(
      apiUrl + '/Users/Register',
      userRegister
    );
  }

  loginUser(email: string, password: string) {
    return this.httpClient
      .post<AuthResult>(
        apiUrl + '/Users/Login',
        { email: email, password: password },
        { observe: 'response' }
      )
      .pipe(
        tap((responseData) => {
          if (
            responseData.body !== null &&
            responseData.headers.get('authtoken') !== null
          ) {
            const user = new AppUser(
              responseData.body.id,
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
    this.router.navigate(['/home']);
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) return;
    const userData: {
      id: number;
      email: string;
      name: string;
      role: number;
      token: string;
    } = JSON.parse(userDataString);
    if (!userData) return;
    const loadedUser = new AppUser(
      userData.id,
      userData.role,
      userData.name,
      userData.email,
      userData.token
    );
    this.currentUser.next(loadedUser);
  }

  constructor(private httpClient: HttpClient, private router: Router) {}
}
