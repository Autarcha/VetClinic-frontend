import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { EditAnimalComponent } from './edit-animal.component';

@NgModule({
  declarations: [EditAnimalComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  exports: [EditAnimalComponent],
})
export class EditAnimalModule {}
