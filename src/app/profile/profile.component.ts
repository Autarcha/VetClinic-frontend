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
  public userDetailsForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((result) => {
      this.user = result;

      this.userDetailsForm = this.formBuilder.group({
        email: [
          { value: this.user.email, disabled: false },
          [Validators.email, Validators.required],
        ],
        name: [
          { value: this.user.name, disabled: false },
          [Validators.minLength(3), Validators.required],
        ],
        surname: [
          { value: this.user.surname, disabled: false },
          [Validators.minLength(3), Validators.required],
        ],
        phoneNumber: [
          { value: this.user.phoneNumber, disabled: false },
          [
            Validators.minLength(9),
            Validators.maxLength(9),
            Validators.required,
          ],
        ],
      });
    });
  }

  changePasswordForm = this.formBuilder.group({
    oldPassword: ['', [Validators.minLength(8), Validators.required]],
    newPassword: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.minLength(8), Validators.required]],
  });

  onSubmit() {
    console.log('cispko');
  }
}
