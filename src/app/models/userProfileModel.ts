export class UserProfile {
  public name: string;
  public surname: string;
  public email: string;
  public phoneNumber: string;

  constructor(
    name: string,
    surname: string,
    email: string,
    phoneNumber: string
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phoneNumber = phoneNumber;
  }
}
