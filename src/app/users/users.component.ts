import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserDetails } from '../models/userDetailsModel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  selectedUser: any = null;
  users: UserDetails[] = [];
  cols: any[];
  displayAddEditUserModal: boolean = false;
  displayAddAnimalModal: boolean = false;
  displayAddVisitModal: boolean = false;
  private userSubscription: Subscription | null = null;
  public userRole: number = 0;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();

    this.userSubscription = this.userService.currentUser.subscribe((user) => {
      this.userRole = user ? user.role : 0;
    });

    this.cols = [
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Numer telefonu' },
    ];
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  getAllUsers() {
    this.userService
      .getAllUsers()
      .subscribe((response) => (this.users = response));
  }

  showAddUserModal() {
    this.displayAddEditUserModal = true;
    this.selectedUser = null;
  }

  hideAddEditUserModal(isClosed: boolean) {
    this.displayAddEditUserModal = false;
    this.getAllUsers();
  }

  showEditUserModal(user: UserDetails) {
    this.displayAddEditUserModal = true;
    this.selectedUser = user;
  }

  showAddAnimalModal(user: UserDetails) {
    this.displayAddAnimalModal = true;
    this.selectedUser = user;
  }

  hideAddAnimalModal(isClosed: boolean) {
    this.displayAddAnimalModal = false;
  }

  showAddVisitModal(user: UserDetails) {
    this.displayAddVisitModal = true;
    this.selectedUser = user;
  }

  hideAddVisitModal(isClosed: boolean) {
    this.displayAddVisitModal = false;
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
