import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AnimalService } from '../../services/animal.service';
import { MessageService } from 'primeng/api';
import { AnimalDetails } from '../../models/animalDetails';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css'],
})
export class AddAnimalComponent implements OnInit {
  @Input() displayModal: boolean = true;
  @Input() selectedUser: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.selectedUser) {
      this.animalForm.controls.ownerId.patchValue(this.selectedUser.id);
    } else {
      this.animalForm.reset();
    }
  }

  animalForm = this.formBuilder.group({
    ownerId: [
      {
        value: 0,
        disabled: false,
      },
    ],
    name: [
      { value: '', disabled: false },
      [
        Validators.minLength(3),
        Validators.required,
        Validators.pattern('^[a-zA-ZąęółżźćńśĄĘÓŻŹĆŃŁŚ]{3,60}$'),
      ],
    ],
    specie: [{ value: '', disabled: false }, [Validators.required]],
    additionalInfo: [
      {
        value: '',
        disabled: false,
      },
    ],
  });

  closeModal() {
    this.clickClose.emit(true);
  }

  editAnimal() {
    this.animalService
      .addAnimal(this.animalForm.value as AnimalDetails)
      .subscribe(
        (response) => {
          this.animalForm.reset();
          this.clickClose.emit(true);
          this.messageService.add({
            key: 'myKey1',
            severity: 'success',
            summary: 'Sukces',
            detail: 'Pomyśnie dodano zwierzę',
          });
        },
        (error) => {}
      );
  }
}
