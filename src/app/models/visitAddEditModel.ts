export class VisitAddEdit {
  public employeeId: number;
  public customerId: number;
  public animalId?: number;
  public visitDateTime: string;

  constructor(
    employeeId: number,
    customerId: number,
    visitDateTime: string,
    animalId?: number
  ) {
    this.employeeId = employeeId;
    this.customerId = customerId;
    this.visitDateTime = visitDateTime;
    this.animalId = animalId;
  }
}
