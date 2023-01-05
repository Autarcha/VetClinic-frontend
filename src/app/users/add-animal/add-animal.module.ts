import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAnimalComponent } from './add-animal.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [AddAnimalComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextareaModule,
  ],
  exports: [AddAnimalComponent],
})
export class AddAnimalModule {}
