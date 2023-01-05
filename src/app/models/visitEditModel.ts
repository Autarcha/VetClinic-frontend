export class VisitEdit {
  public employeeId: number;
  public customerId: number;
  public animalId?: number;
  public visitDateTime: string;
  public visitStatus: number;

  constructor(
    employeeId: number,
    customerId: number,
    visitDateTime: string,
    visitStatus: number,
    animalId?: number
  ) {
    this.employeeId = employeeId;
    this.customerId = customerId;
    this.visitDateTime = visitDateTime;
    this.visitStatus = visitStatus;
    this.animalId = animalId;
  }
}
