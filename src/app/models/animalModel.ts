import { UserDetails } from './userDetailsModel';

export class Animal {
  public id: number;
  public owner: UserDetails;
  public name: string;
  public specie: string;
  public additionalDetails: string;

  constructor(
    id: number,
    owner: UserDetails,
    name: string,
    specie: string,
    additionalDetails: string
  ) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    this.specie = specie;
    this.additionalDetails = additionalDetails;
  }
}
