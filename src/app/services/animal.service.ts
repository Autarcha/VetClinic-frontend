import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../app.module';
import { Animal } from '../models/animalModel';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  getAllAnimals() {
    return this.httpClient.get<Animal[]>(apiUrl + '/Animals');
  }

  getCustomerAnimals(animalData: Animal, ownerId: number) {
    return this.httpClient.get<Animal[]>(apiUrl + '/Animals/' + ownerId);
  }

  editAnimal(animalData: Animal) {
    return this.httpClient.put<Animal>(apiUrl + '/Animals', animalData);
  }

  addAnimal(animalData: Animal) {
    return this.httpClient.post<Animal>(apiUrl + '/Animals', animalData);
  }
  constructor(private httpClient: HttpClient) {}
}
