export enum RolesEnum {
  Admin = 1,
  Employee = 2,
  User = 4,
}

export const RolesMapping: Record<RolesEnum, string> = {
  [RolesEnum.Admin]: 'Administrator',
  [RolesEnum.Employee]: 'Pracownik',
  [RolesEnum.User]: 'Klient',
};
