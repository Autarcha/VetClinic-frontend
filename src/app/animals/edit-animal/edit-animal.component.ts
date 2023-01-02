import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AnimalService } from '../../services/animal.service';
import { AnimalDetails } from '../../models/animalDetails';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css'],
})
export class EditAnimalComponent implements OnInit {
  @Input() displayModal: boolean = true;
  @Input() selectedAnimal: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.selectedAnimal) {
      this.animalForm.patchValue(this.selectedAnimal);
    } else {
      this.animalForm.reset();
    }
  }

  animalForm = this.formBuilder.group({
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
      .editAnimal(
        this.animalForm.value as AnimalDetails,
        this.selectedAnimal.id
      )
      .subscribe(
        () => {
          this.animalForm.reset();
          this.clickClose.emit(true);
          this.messageService.add({
            key: 'myKey1',
            severity: 'success',
            summary: 'Sukces',
            detail: 'Pomyśnie zedytowano zwierzę',
          });
        },
        (error) => {}
      );
  }
}
