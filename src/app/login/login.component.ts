import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthResult } from '../services/authModel';
import { Router } from '@angular/router';

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
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
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
          this.router.navigate(['/home']);
        },
        (error) => {
          if (error.status === 403) {
            this.userNotFound = true;
          }
        }
      );
  }
}
