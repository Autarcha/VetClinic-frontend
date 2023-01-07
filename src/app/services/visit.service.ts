import { Injectable } from '@angular/core';
import { apiUrl } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { Visit } from '../models/visitModel';
import { VisitEdit } from '../models/visitEditModel';
import { VisitAdd } from '../models/visitAddModel';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  getAllVisits() {
    return this.httpClient.get<Visit[]>(apiUrl + '/Visits');
  }

  addVisit(visitBody: VisitAdd) {
    return this.httpClient.post<VisitAdd>(apiUrl + '/Visits', visitBody);
  }

  updateVisit(visitId: number, visitBody: VisitEdit) {
    return this.httpClient.put<VisitEdit>(
      apiUrl + '/Visits/' + visitId,
      visitBody
    );
  }

  constructor(private httpClient: HttpClient) {}
}
