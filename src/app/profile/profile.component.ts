import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
      console.log(this.user);
    });
  }

  public userDetailsForm = this.formBuilder.group({
    email: ['test', [Validators.email, Validators.required]],
    name: ['', [Validators.minLength(3), Validators.required]],
    surname: ['', [Validators.minLength(3), Validators.required]],
    phoneNumber: [
      '',
      [Validators.minLength(9), Validators.maxLength(9), Validators.required],
    ],
  });

  changePasswordForm = this.formBuilder.group({
    oldPassword: ['', [Validators.minLength(8), Validators.required]],
    newPassword: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.minLength(8), Validators.required]],
  });

  onSubmit() {}
}
