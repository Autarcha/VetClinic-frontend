import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/userDetailsModel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.html',
  styleUrls: ['./add-edit-user.css'],
})
export class AddEditUserComponent implements OnInit {
  @Input() displayModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  userExists: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  userRegisterForm = this.formBuilder.group({
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
  });

  closeModal() {
    this.clickClose.emit(true);
  }

  onSubmitRegister() {
    this.userExists = false;

    this.userService
      .registerUser(this.userRegisterForm.value as UserDetails)
      .subscribe(
        (response) => {
          this.userRegisterForm.reset();
          this.clickClose.emit(true);
          this.messageService.add({
            key: 'myKey1',
            severity: 'success',
            summary: 'Sukces',
            detail: 'Zarejestrowano użytkownika',
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
