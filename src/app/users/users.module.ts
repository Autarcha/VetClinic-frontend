import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AddEditUserModule } from './add-edit-user/add-edit-user.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UsersComponent } from './users.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { AddAnimalModule } from './add-animal/add-animal.module';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    AddEditUserModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
    AddAnimalModule,
    RippleModule,
  ],
  providers: [MessageService, ConfirmationService],
  exports: [UsersComponent],
})
export class UsersModule {}
