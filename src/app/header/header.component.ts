import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private userSubscription: Subscription | null = null;
  public isAuthenticated = false;
  public userName: string = '';
  public userRole: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.userName = user ? user.name : '';
      this.userRole = user ? user.role : 0;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  logout() {
    this.userService.logoutUser();
  }
}
