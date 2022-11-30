import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthResult } from '../services/authModel';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output()
  userLoggedIn = new EventEmitter<AuthResult>();
  userNotFound: boolean = false;

  userLoginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  onSubmit() {
    this.userNotFound = false;
    this.userService
      .loginUser(
        this.userLoginForm.value.email || '',
        this.userLoginForm.value.password || ''
      )
      .subscribe(
        (result) => {
          this.userLoggedIn.emit(result.body!);
          // window.location.href = '/';
        },
        (error) => {
          if (error.status === HttpStatusCode.NotFound) {
            this.userNotFound = true;
          }
        }
      );
  }
}
