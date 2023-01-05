export class VisitEdit {
  public employeeId: number;
  public animalID: number | null;
  public visitDateTime: string;
  public visitStatus: number;

  constructor(
    employeeId: number,
    visitDateTime: string,
    visitStatus: number,
    animalID: number | null
  ) {
    this.employeeId = employeeId;
    this.visitDateTime = visitDateTime;
    this.visitStatus = visitStatus;
    this.animalID = animalID;
  }
}
