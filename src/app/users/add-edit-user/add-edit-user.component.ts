import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/userDetailsModel';
import { MessageService } from 'primeng/api';
import { Roles, RolesMapping } from '../../enums/roles';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.html',
  styleUrls: ['./add-edit-user.css'],
})
export class AddEditUserComponent implements OnInit, OnChanges {
  @Input() displayAddEditUserModal: boolean = true;
  @Input() selectedUser: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  modalType = 'Zarejestruj';
  userExists: boolean = false;
  public rolesMapping: any = RolesMapping;
  public roleTypes: any = Object.values(Roles).filter(
    (value) => typeof value === 'number'
  );

  private userSubscription: Subscription | null = null;
  public userRole: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser.subscribe((user) => {
      this.userRole = user ? user.role : 0;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  ngOnChanges() {
    if (this.selectedUser) {
      this.modalType = 'Edytuj';
      this.userForm.patchValue(this.selectedUser);
    } else {
      this.userForm.reset();
      this.modalType = 'Zarejestruj';
    }
  }

  userForm = this.formBuilder.group({
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
    role: [
      {
        value: Roles.User,
        disabled: false,
      },
    ],
  });

  closeModal() {
    this.clickClose.emit(true);
  }

  onAddEditSubmit() {
    this.userExists = false;

    if (this.modalType === 'Edytuj') {
      this.editUser();
    } else {
      this.registerUser();
    }
  }

  registerUser() {
    this.userService.registerUser(this.userForm.value as UserDetails).subscribe(
      () => {
        this.userForm.reset();
        this.clickClose.emit(true);
        this.messageService.add({
          key: 'myKey1',
          severity: 'success',
          summary: 'Sukces',
          detail: 'Pomyślnie zarejestrowano użytkownika',
        });
      },
      (error) => {
        if (error.status === 422) {
          this.userExists = true;
        }
      }
    );
  }

  editUser() {
    this.userService
      .editUser(this.userForm.value as UserDetails, this.selectedUser.id)
      .subscribe(
        () => {
          this.userForm.reset();
          this.clickClose.emit(true);
          this.messageService.add({
            key: 'myKey1',
            severity: 'success',
            summary: 'Sukces',
            detail: 'Pomyśnie zedytowano użytkownika',
          });
        },
        (error) => {
          if (error.status === 422) {
            this.userExists = true;
          }
        }
      );
  }
}
