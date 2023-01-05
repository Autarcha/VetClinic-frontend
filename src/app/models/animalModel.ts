import { UserDetails } from './userDetailsModel';

export class Animal {
  public id: number;
  public owner: UserDetails;
  public name: string;
  public specie: string;
  public additionalInfo: string;

  constructor(
    id: number,
    owner: UserDetails,
    name: string,
    specie: string,
    additionalInfo: string
  ) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    this.specie = specie;
    this.additionalInfo = additionalInfo;
  }
}
