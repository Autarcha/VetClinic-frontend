import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditVisitComponent } from './edit-visit.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [EditVisitComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextareaModule,
    FormsModule,
    InputMaskModule,
  ],
  exports: [EditVisitComponent],
})
export class EditVisitModule {}
