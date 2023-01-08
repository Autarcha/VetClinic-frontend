import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AnimalService } from '../../services/animal.service';
import { MessageService } from 'primeng/api';
import { VisitService } from '../../services/visit.service';
import { UserService } from '../../services/user.service';
import { VisitEdit } from '../../models/visitEditModel';
import { UserDetails } from '../../models/userDetailsModel';
import { Animal } from '../../models/animalModel';
import { VisitAdd } from '../../models/visitAddModel';

@Component({
  selector: 'app-add-visit',
  templateUrl: './add-visit.component.html',
  styleUrls: ['./add-visit.component.css'],
})
export class AddVisitComponent implements OnInit {
  @Input() displayAddVisitModal: boolean = true;
  @Input() selectedUser: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  visit: VisitEdit;
  employees: UserDetails[] = [];
  customerAnimals: Animal[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private visitService: VisitService,
    private messageService: MessageService,
    private userService: UserService,
    private animalService: AnimalService
  ) {}

  ngOnInit(): void {
    this.userService.getEmployees().subscribe((response) => {
      this.employees = response;
    });
  }

  ngOnChanges() {
    if (this.selectedUser) {
      this.visitForm.controls.customerId.patchValue(this.selectedUser.id);
      this.animalService
        .getCustomerAnimals(this.selectedUser.id)
        .subscribe((response) => {
          this.customerAnimals = response;
        });
    } else {
      this.visitForm.reset();
    }
  }

  visitForm = this.formBuilder.group({
    customerId: [{ value: 0, disabled: false }, [Validators.required]],
    employeeId: [{ value: 0, disabled: false }, [Validators.required]],
    animalId: new FormControl<number | null>(null),
    visitDateTime: [
      {
        value: '',
        disabled: false,
      },
      [
        Validators.required,
        Validators.pattern(
          '^(((20[012]\\d|19\\d\\d)|(1\\d|2[0123]))\\/((0[0-9])|(1[012]))\\/((0[1-9])|([12][0-9])|(3[01]))) ((1[0-9]|0?[1-9]):([0-5][0-9]))'
        ),
      ],
    ],
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

  addVisit() {
    const date = new Date(this.visitForm.value.visitDateTime ?? '1970/01/01');
    const visitDate = this.getLocalISOString(date);

    const visitEdit: VisitAdd = {
      customerId: this.visitForm.value.customerId ?? 0,
      employeeId: this.visitForm.value.employeeId ?? 0,
      animalId: Number(this.visitForm.value.animalId) ?? null,
      visitDateTime: visitDate ?? '1970/01/01',
    };

    this.visitService.addVisit(visitEdit).subscribe(
      () => {
        this.visitForm.reset();
        this.clickClose.emit(true);
        this.messageService.add({
          key: 'myKey1',
          severity: 'success',
          summary: 'Sukces',
          detail: 'Pomyśnie umówiono wizytę',
        });
      },
      (error) => {}
    );
  }
}
