import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
        animalId: this.selectedVisit.animal
          ? this.selectedVisit.animal.id
          : null,
        visitDateTime: this.selectedVisit.visitDateTime,
        employeeId: this.selectedVisit.employee.id,
        visitStatus: this.selectedVisit.visitStatus,
      };

      console.log(this.visit, 'dupsko');

      this.visitForm.patchValue(this.visit);
    } else {
      this.visitForm.reset();
    }
  }

  visitForm = this.formBuilder.group({
    employeeId: [{ value: 0, disabled: false }, [Validators.required]],
    animalId: new FormControl<number | null>(null),
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
    this.visitForm.reset();
  }

  getLocalISOString(date: Date) {
    const offset = date.getTimezoneOffset();
    const offsetAbs = Math.abs(offset);
    const isoString = new Date(
      date.getTime() - offset * 60 * 1000
    ).toISOString();
    return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(
      Math.floor(offsetAbs / 60)
    ).padStart(2, '0')}:${String(offsetAbs % 60).padStart(2, '0')}`;
  }

  editVisit() {
    const date = new Date(this.visitForm.value.visitDateTime ?? '1970/01/01');
    const visitDate = this.getLocalISOString(date);

    const visitEdit: VisitEdit = {
      employeeId: this.visitForm.value.employeeId ?? 0,
      animalId: Number(this.visitForm.value.animalId) ?? null,
      visitStatus: this.visitForm.value.visitStatus ?? 0,
      visitDateTime: visitDate ?? '1970/01/01',
    };

    this.visitService.updateVisit(this.selectedVisit.id, visitEdit).subscribe(
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
