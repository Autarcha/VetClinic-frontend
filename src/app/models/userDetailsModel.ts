export class UserDetails {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public phoneNumber: string;
  public role: number;

  constructor(
    id: number,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    role: number
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }
}
