import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserDetails } from '../models/userDetailsModel';
import { Table } from 'primeng/table';

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
  fullName: any[];

  @ViewChild('dt') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

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
}
