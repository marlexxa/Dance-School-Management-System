import { RoleType } from '../enum/role.enum';

export class CreateRoleDto {
  roleType: RoleType;
  userID: string;
}
