export enum UserRole {
  SUPER_ADMIN = 32767,
  ADMIN = 16383,
  STORE_MANAGER = 8191,
  VENDOR = 4095,
  DELIVERY_PARTNER = 2047,
  END_USER = 1023,
}

export const UserRolesEnum = [
  UserRole.SUPER_ADMIN,
  UserRole.ADMIN,
  UserRole.STORE_MANAGER,
  UserRole.VENDOR,
  UserRole.DELIVERY_PARTNER,
  UserRole.END_USER,
];
