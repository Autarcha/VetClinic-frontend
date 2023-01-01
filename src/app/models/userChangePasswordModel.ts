export class UserChangePassword {
  public oldPassword?: string;
  public newPassword?: string;

  constructor(newPassword: string, oldPassword: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
