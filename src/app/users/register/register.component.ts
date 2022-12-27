import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import * as RandExp from 'randexp';
import { UserDetails } from '../../models/userDetailsModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() displayAddUserModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  success: boolean = false;
  userExists: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  userRegisterForm = this.formBuilder.group({
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
    email: [
      { value: '', disabled: false },
      [Validators.email, Validators.required],
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

  closeModal() {
    this.clickClose.emit(true);
  }

  onSubmitRegister() {
    this.success = false;
    this.userExists = false;

    this.userService
      .registerUser(this.userRegisterForm.value as UserDetails)
      .subscribe(
        () => {
          this.success = true;
          this.userRegisterForm.reset();
        },
        (error) => {
          if (error.status === 422) {
            this.userExists = true;
            this.userRegisterForm.reset();
          }
        }
      );
  }
}
