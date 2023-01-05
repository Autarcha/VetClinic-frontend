import { Injectable } from '@angular/core';
import { apiUrl } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { Visits } from '../models/visitsModel';
import { VisitAddEdit } from '../models/visitAddEditModel';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  getAllVisits() {
    return this.httpClient.get<Visits[]>(apiUrl + '/Visits');
  }

  addVisit(visitBody: VisitAddEdit) {
    return this.httpClient.post<VisitAddEdit>(apiUrl + '/Visits', visitBody);
  }

  updateVisit(visitId: number, visitBody: VisitAddEdit) {
    return this.httpClient.put<VisitAddEdit>(
      apiUrl + '/Visits/' + visitId,
      visitBody
    );
  }

  constructor(private httpClient: HttpClient) {}
}
