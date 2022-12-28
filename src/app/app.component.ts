import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'VetClinic-frontend';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.autoLogin();
    this.router.navigate(['/home']);
  }
}
