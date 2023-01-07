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
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { RouterLinkWithHref } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VisitsComponent, VisitDetailsComponent],
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
    RouterLinkWithHref,
    ReactiveFormsModule,
  ],
  providers: [MessageService, ConfirmationService],
  exports: [VisitsComponent],
})
export class VisitsModule {}
