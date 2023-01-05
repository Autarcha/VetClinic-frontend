import { Injectable } from '@angular/core';
import { apiUrl } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { VisitDetails } from '../models/visitDetailsModel';

@Injectable({
  providedIn: 'root',
})
export class VisitDetailsService {
  addVisitDetails(visitId: number, visitDetails: VisitDetails) {
    return this.httpClient.post<VisitDetails>(
      apiUrl + '/visits/' + visitId + '/details',
      visitDetails
    );
  }

  updateVisitDetails(visitId: number, visitDetails: VisitDetails) {
    return this.httpClient.put<VisitDetails>(
      apiUrl + '/visits/' + visitId + '/details',
      visitDetails
    );
  }

  constructor(private httpClient: HttpClient) {}
}
