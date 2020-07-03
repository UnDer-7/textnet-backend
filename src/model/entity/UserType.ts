import Verify from '../../util/Verify';

enum UserType {
  PASSWORD_USER = 'PASSWORD_USER',
  GOOGLE_USER = 'GOOGLE_USER',
  FACEBOOK_USER = 'FACEBOOK_USER',
}

export function existsIn(value: string | null | undefined): boolean {
  if (Verify.isUndefinedOrNull(value)) return false;

  const values: string[] = [
    UserType.PASSWORD_USER,
    UserType.GOOGLE_USER,
    UserType.FACEBOOK_USER,
  ];
  return values.includes(value as string)
}

export default UserType;
