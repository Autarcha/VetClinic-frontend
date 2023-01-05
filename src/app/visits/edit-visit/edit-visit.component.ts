import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { VisitService } from '../../services/visit.service';
import { VisitEdit } from '../../models/visitEditModel';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/userDetailsModel';
import { AnimalService } from '../../services/animal.service';
import { Animal } from '../../models/animalModel';
import {
  VisitStatusesEnum,
  VisitStatusesMapping,
} from '../../enums/visitStatusesEnum';

@Component({
  selector: 'app-edit-visit',
  templateUrl: './edit-visit.component.html',
  styleUrls: ['./edit-visit.component.css'],
})
export class EditVisitComponent implements OnInit {
  @Input() displayModal: boolean = true;
  @Input() selectedVisit: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private visitService: VisitService,
    private messageService: MessageService,
    private userService: UserService,
    private animalService: AnimalService
  ) {}

  visit: VisitEdit;
  employees: UserDetails[] = [];
  customerAnimals: Animal[] = [];

  public visitStatusesMapping: any = VisitStatusesMapping;
  public visitStatuses: any = Object.values(VisitStatusesEnum).filter(
    (value) => typeof value === 'number'
  );

  ngOnInit(): void {
    this.userService.getEmployees().subscribe((response) => {
      this.employees = response;
    });
  }

  ngOnChanges() {
    if (this.selectedVisit) {
      this.animalService
        .getCustomerAnimals(this.selectedVisit.customer.id)
        .subscribe((response) => {
          this.customerAnimals = response;
        });

      this.visit = {
        animalId: this.selectedVisit.animal.id || null,
        visitDateTime: this.selectedVisit.visitDateTime,
        customerId: this.selectedVisit.customer.id,
        employeeId: this.selectedVisit.employee.id,
        visitStatus: this.selectedVisit.visitStatus,
      };
    } else {
      this.visitForm.reset();
    }
  }

  visitForm = this.formBuilder.group({
    employeeId: [{ value: 0, disabled: false }, [Validators.required]],
    customerId: [{ value: 0, disabled: false }, [Validators.required]],
    animalId: [
      {
        value: null,
        disabled: false,
      },
    ],
    visitDateTime: [
      {
        value: '',
        disabled: false,
      },
      [Validators.required],
    ],
    visitStatus: [{ value: 0, disabled: false }, [Validators.required]],
  });

  closeModal() {
    this.clickClose.emit(true);
  }

  editVisit() {
    this.visitService
      .updateVisit(this.selectedVisit.id, this.visitForm.value as VisitEdit)
      .subscribe(
        () => {
          this.visitForm.reset();
          this.clickClose.emit(true);
          this.messageService.add({
            key: 'myKey1',
            severity: 'success',
            summary: 'Sukces',
            detail: 'Pomyśnie zedytowano wizytę',
          });
        },
        (error) => {}
      );
  }
}
