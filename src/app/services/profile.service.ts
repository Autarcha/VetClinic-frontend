import { Injectable } from '@angular/core';
import { UserProfile } from '../models/userProfileModel';
import { apiUrl } from '../app.module';
import { UserChangePassword } from '../models/userChangePasswordModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  getUserProfile() {
    return this.httpClient.get<UserProfile>(apiUrl + '/Profile');
  }

  updateUserProfile(userUpdateDetails: UserProfile) {
    return this.httpClient.put<UserProfile>(
      apiUrl + '/Profile',
      userUpdateDetails
    );
  }

  changePassword(userChangePassword: UserChangePassword) {
    return this.httpClient.put<UserChangePassword>(
      apiUrl + '/Profile/ChangePassword',
      userChangePassword
    );
  }

  constructor(private httpClient: HttpClient) {}
}
