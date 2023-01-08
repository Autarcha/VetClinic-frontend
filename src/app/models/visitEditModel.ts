export class VisitEdit {
  public employeeId: number;
  public animalId: number | null;
  public visitDateTime: string;
  public visitStatus: number;

  constructor(
    employeeId: number,
    visitDateTime: string,
    visitStatus: number,
    animalId: number | null
  ) {
    this.employeeId = employeeId;
    this.visitDateTime = visitDateTime;
    this.visitStatus = visitStatus;
    this.animalId = animalId;
  }
}
