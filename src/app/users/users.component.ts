import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserDetails } from '../models/userDetailsModel';
import * as RandExp from 'randexp';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  loading: boolean = true;
  user: UserDetails;
  users: UserDetails[] = [];
  cols: any[];
  displayAddUserModal: boolean = false;
  isAdmin: boolean = false;

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

  showAddUserModal() {
    this.displayAddUserModal = true;
  }

  hideRegisterModal(isClosed: boolean) {
    this.displayAddUserModal = false;
    this.getAllUsers();
  }
}
