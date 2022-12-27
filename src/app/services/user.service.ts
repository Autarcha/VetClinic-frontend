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

  getUserProfile() {
    return this.httpClient.get<UserProfile>(apiUrl + '/Users/Profile');
  }

  getAllUsers() {
    return this.httpClient.get<UserDetails[]>(apiUrl + '/Users');
  }

  updateUser(userUpdateDetails: UserProfile) {
    return this.httpClient.put<UserProfile>(
      apiUrl + '/Users/UpdateDetails',
      userUpdateDetails
    );
  }

  changePassword(userChangePassword: UserChangePassword) {
    return this.httpClient.put<UserChangePassword>(
      apiUrl + '/Users/ChangePassword',
      userChangePassword
    );
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
      email: string;
      name: string;
      userRole: number;
      token: string;
    } = JSON.parse(userDataString);
    if (!userData) return;
    const loadedUser = new AppUser(
      userData.userRole,
      userData.name,
      userData.email,
      userData.token
    );
    this.currentUser.next(loadedUser);
  }

  constructor(private httpClient: HttpClient, private router: Router) {}
}
