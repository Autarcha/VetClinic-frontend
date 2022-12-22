export class User {
  constructor(
    public role: number,
    public name: string,
    public email: string,
    public token: string
  ) {}
}

export class UserDetails {
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

export class UserChangePassword {
  public oldPassword?: string;
  public newPassword?: string;

  constructor(newPassword: string, oldPassword: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
