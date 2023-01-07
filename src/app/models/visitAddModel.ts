export class VisitAdd {
  public customerId: number;
  public employeeId: number;
  public animalId: number | null;
  public visitDateTime: string;

  constructor(
    customerId: number,
    visitDateTime: string,
    employeeId: number,
    animalId: number | null
  ) {
    this.employeeId = employeeId;
    this.visitDateTime = visitDateTime;
    this.customerId = customerId;
    this.animalId = animalId;
  }
}
