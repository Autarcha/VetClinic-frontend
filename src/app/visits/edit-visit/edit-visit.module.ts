import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditVisitComponent } from './edit-visit.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [EditVisitComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextareaModule,
  ],
  exports: [EditVisitComponent],
})
export class EditVisitModule {}
