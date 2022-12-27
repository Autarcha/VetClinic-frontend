import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserDetails } from '../models/userDetailsModel';
import { UserProfile } from '../models/userProfileModel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  user: UserDetails;
  users: UserDetails[] = [];
  cols: any[];
  displayModal: boolean = false;
  selectedUser: any = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Imię' },
      { field: 'surname', header: 'Nazwisko' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Numer telefonu' },
    ];
  }

  getAllUsers() {
    this.userService
      .getAllUsers()
      .subscribe((response) => (this.users = response));
  }

  showRegisterModal() {
    this.displayModal = true;
  }

  hideRegisterModal(isClosed: boolean) {
    this.displayModal = false;
    this.getAllUsers();
  }

  showEditModal() {
    this.displayModal = true;
  }
}
