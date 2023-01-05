import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitsComponent } from './visits.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { EditVisitModule } from './edit-visit/edit-visit.module';

@NgModule({
  declarations: [VisitsComponent],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
    RippleModule,
    EditVisitModule,
  ],
  providers: [MessageService, ConfirmationService],
  exports: [VisitsComponent],
})
export class VisitsModule {}
