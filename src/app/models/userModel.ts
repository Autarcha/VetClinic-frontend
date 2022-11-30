export class User {
  constructor(
    public role: string,
    public name: string,
    public email: string,
    public token: string
  ) {}
}
