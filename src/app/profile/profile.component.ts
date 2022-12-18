import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserDetails } from '../models/userModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: UserDetails;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
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
    oldPassword: ['', [Validators.minLength(8), Validators.required]],
    newPassword: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.minLength(8), Validators.required]],
  });

  onSubmit() {
    this.userService.updateUser(this.userDetailsForm.value as UserDetails);
  }
}
