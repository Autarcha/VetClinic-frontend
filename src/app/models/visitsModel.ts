import { UserDetails } from './userDetailsModel';
import { Animal } from './animalModel';
import { VisitDetails } from './visitDetailsModel';

export class Visits {
  public id: number;
  public employee: UserDetails;
  public customer: UserDetails;
  public animal?: Animal;
  public visitDateTime: string;
  public visitStatus: number;
  public VisitDetails?: VisitDetails;

  constructor(
    id: number,
    employee: UserDetails,
    customer: UserDetails,
    visitDateTime: string,
    visitStatus: number,
    animal?: Animal,
    visitDetails?: VisitDetails
  ) {
    this.id = id;
    this.employee = employee;
    this.customer = customer;
    this.visitStatus = visitStatus;
    this.visitDateTime = visitDateTime;
    this.animal = animal;
    this.VisitDetails = visitDetails;
  }
}
