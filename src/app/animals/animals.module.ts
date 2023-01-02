import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { AddEditUserModule } from '../users/add-edit-user/add-edit-user.module';
import { AnimalsComponent } from './animals.component';

@NgModule({
  declarations: [AnimalsComponent],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    AddEditUserModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  exports: [AnimalsComponent],
})
export class AnimalsModule {}
