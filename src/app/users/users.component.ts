import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDetails } from '../models/userDetailsModel';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  selectedUser: any = null;
  users: UserDetails[] = [];
  cols: any[];
  displayModal: boolean = false;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

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
    this.selectedUser = null;
  }

  hideModal(isClosed: boolean) {
    this.displayModal = false;
    this.getAllUsers();
  }

  showEditModal(user: UserDetails) {
    this.displayModal = true;
    this.selectedUser = user;
  }

  showAddAnimalModal(user: UserDetails) {
    this.displayModal = true;
    this.selectedUser = user;
  }

  deleteUser(user: UserDetails) {
    this.confirmationService.confirm({
      message: 'Czy na pewno chcesz usunąć tego użytkownika?',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(
          (response) => {
            this.getAllUsers();
            this.messageService.add({
              key: 'myKey1',
              severity: 'success',
              summary: 'Sukces',
              detail: 'Pomyślnie usunięto użytkownika',
            });
          },
          (error) => {
            this.messageService.add({
              key: 'myKey1',
              severity: 'error',
              summary: 'Bład',
              detail: error,
            });
          }
        );
      },
    });
  }
}
