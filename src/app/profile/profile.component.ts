import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserChangePassword, UserDetails } from '../models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: UserDetails;
  userChangePassword: UserChangePassword = {};
  wrongConfirm: boolean = false;
  samePassword: boolean = false;
  success: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((result) => {
      this.user = result;
      this.userDetailsForm.setValue(this.user);
    });
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

  onSubmitDetails() {
    this.userService
      .updateUser(this.userDetailsForm.value as UserDetails)
      .subscribe(
        (result) => {
          this.router.navigate(['/profile']);
        },
        (error) => {}
      );
  }

  onSubmitPassword() {
    this.success = false;
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
    this.userService.changePassword(this.userChangePassword).subscribe(
      (result) => {
        this.success = true;
        this.changePasswordForm.reset();
      },
      (error) => {}
    );
  }
}
