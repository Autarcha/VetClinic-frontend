export class AppUser {
  constructor(
    public id: number,
    public role: number,
    public name: string,
    public email: string,
    public token: string
  ) {}
}
