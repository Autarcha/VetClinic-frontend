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
import { AnimalsComponent } from './animals.component';
import { EditAnimalModule } from './edit-animal/edit-animal.module';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [AnimalsComponent],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    EditAnimalModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
    RippleModule,
  ],
  providers: [MessageService, ConfirmationService],
  exports: [AnimalsComponent],
})
export class AnimalsModule {}
