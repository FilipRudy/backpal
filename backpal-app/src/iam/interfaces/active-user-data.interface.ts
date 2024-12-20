import { Role } from '../../users/enums/role.enum';

export interface ActiveUserData {
  sub: number;

  email: string;

  userId: string;

  role: Role;
}
