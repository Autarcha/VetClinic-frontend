export class AnimalDetails {
  public ownerId: number;
  public name: string;
  public specie: string;
  public additionalInfo: string;

  constructor(
    ownerId: number,
    name: string,
    specie: string,
    additionalInfo: string
  ) {
    this.ownerId = ownerId;
    this.name = name;
    this.specie = specie;
    this.additionalInfo = additionalInfo;
  }
}
