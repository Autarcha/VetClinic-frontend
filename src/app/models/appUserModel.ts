export class AppUser {
  constructor(
    public role: number,
    public name: string,
    public email: string,
    public token: string
  ) {}
}
