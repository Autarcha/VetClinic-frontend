import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../app.module';
import { Animal } from '../models/animalModel';
import { AnimalDetails } from '../models/animalDetails';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  getAllAnimals() {
    return this.httpClient.get<Animal[]>(apiUrl + '/Animals');
  }

  getCustomerAnimals(ownerId: number) {
    return this.httpClient.get<Animal[]>(apiUrl + '/Animals/' + ownerId);
  }

  editAnimal(animalData: AnimalDetails, animalId: number) {
    return this.httpClient.put<AnimalDetails>(
      apiUrl + '/Animals/' + animalId,
      animalData
    );
  }

  addAnimal(animalData: AnimalDetails) {
    return this.httpClient.post<AnimalDetails>(apiUrl + '/Animals', animalData);
  }
  constructor(private httpClient: HttpClient) {}
}
