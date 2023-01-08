export class VisitDetails {
  public id: number;
  public visitPurpose: string;
  public description: string;
  public appliedDrugs?: string;
  public prescription?: string;
  public recommendations?: string;
  public bill: number;

  constructor(
    id: number,
    visitPurpose: string,
    description: string,
    bill: number,
    appliedDrugs?: string,
    recommendations?: string,
    prescription?: string
  ) {
    this.id = id;
    this.visitPurpose = visitPurpose;
    this.description = description;
    this.bill = bill;
    this.appliedDrugs = appliedDrugs;
    this.recommendations = recommendations;
    this.prescription = prescription;
  }
}
