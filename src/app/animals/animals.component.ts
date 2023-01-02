import { Component, OnInit } from '@angular/core';
import { Animal } from '../models/animalModel';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AnimalService } from '../services/animal.service';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserDetails } from '../models/userDetailsModel';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css'],
})
export class AnimalsComponent implements OnInit {
  selectedAnimal: any = null;
  animals: Animal[] = [];
  displayModal: boolean = false;
  private userSubscription: Subscription | null = null;
  private userRole: number = 0;
  private userId: number = 0;

  constructor(
    private animalService: AnimalService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser.subscribe((user) => {
      this.userRole = user ? user.role : 0;
      this.userId = user ? user.id : 0;
    });

    if (this.userId === 4) {
      this.getCustomerAnimals();
    } else this.getAllAnimals();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  getAllAnimals() {
    this.animalService
      .getAllAnimals()
      .subscribe((response) => (this.animals = response));
  }

  getCustomerAnimals() {
    this.animalService
      .getCustomerAnimals(this.userId)
      .subscribe((response) => (this.animals = response));
  }

  showEditModal(animal: Animal) {
    this.displayModal = true;
    this.selectedAnimal = animal;
  }

  hideEditModal(isClosed: boolean) {
    this.displayModal = false;
    if (this.userId === 4) {
      this.getCustomerAnimals();
    } else this.getAllAnimals();
  }
}
