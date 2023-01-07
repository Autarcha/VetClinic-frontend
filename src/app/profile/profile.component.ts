import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from '../models/userProfileModel';
import { UserChangePassword } from '../models/userChangePasswordModel';
import { ProfileService } from '../services/profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userId: number;
  user: UserProfile;
  userChangePassword: UserChangePassword = {};
  wrongConfirm: boolean = false;
  samePassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  userDetailsForm = this.formBuilder.group({
    email: [
      { value: '', disabled: false },
      [Validators.email, Validators.required],
    ],
    name: [
      { value: '', disabled: false },
      [
        Validators.minLength(3),
        Validators.required,
        Validators.pattern('^[a-zA-ZąęółżźćńśĄĘÓŻŹĆŃŁŚ]{3,60}$'),
      ],
    ],
    surname: [
      { value: '', disabled: false },
      [
        Validators.minLength(3),
        Validators.required,
        Validators.pattern('^[a-zA-ZąęółżźćńśĄĘÓŻŹĆŃŁŚ]{3,60}$'),
      ],
    ],
    phoneNumber: [
      { value: '', disabled: false },
      [
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.required,
        Validators.pattern('^[0-9]{9,9}$'),
      ],
    ],
  });

  changePasswordForm = this.formBuilder.group({
    oldPassword: [''],
    newPassword: [
      '',
      [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ],
    ],
    confirmPassword: ['', [Validators.minLength(8), Validators.required]],
  });

  getUserProfile() {
    this.profileService.getUserProfile().subscribe((result) => {
      this.user = result;
      this.userDetailsForm.setValue(this.user);
    });
  }

  onSubmitDetails() {
    this.profileService
      .updateUserProfile(this.userDetailsForm.value as UserProfile)
      .subscribe(
        (result) => {
          this.messageService.add({
            key: 'myKey3',
            severity: 'success',
            summary: 'Sukces',
            detail: 'Pomyśnie zaktualizowano dane',
          });
          this.getUserProfile();
        },
        (error) => {}
      );
  }

  onSubmitPassword() {
    this.samePassword = false;
    this.wrongConfirm = false;

    this.userChangePassword.oldPassword =
      this.changePasswordForm.controls.oldPassword.value || '';
    this.userChangePassword.newPassword =
      this.changePasswordForm.controls.newPassword.value || '';

    if (
      this.userChangePassword.newPassword !==
      this.changePasswordForm.controls.confirmPassword.value
    ) {
      this.wrongConfirm = true;
      return;
    }

    if (
      this.userChangePassword.newPassword ===
      this.userChangePassword.oldPassword
    ) {
      this.samePassword = true;
    }
    this.profileService.changePassword(this.userChangePassword).subscribe(
      (response) => {
        this.messageService.add({
          key: 'myKey3',
          severity: 'success',
          summary: 'Sukces',
          detail: 'Pomyśnie zmieniono hasło',
        });
        this.changePasswordForm.reset();
      },
      (error) => {}
    );
  }
}
