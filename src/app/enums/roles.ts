export enum Roles {
  Admin = 1,
  Employee = 2,
  User = 4,
}

export const RolesMapping: Record<Roles, string> = {
  [Roles.Admin]: 'Administrator',
  [Roles.Employee]: 'Pracownik',
  [Roles.User]: 'Klient',
};
