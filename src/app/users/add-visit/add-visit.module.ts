import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddVisitComponent } from './add-visit.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [AddVisitComponent],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextareaModule,
    InputMaskModule,
  ],
  exports: [AddVisitComponent],
})
export class AddVisitModule {}
