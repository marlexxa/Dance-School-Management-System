import { RoleType } from '../enum/role.enum';
import { UserInterface } from '../../user/interfaces/user.interface';

export class CreateRoleDto {
  roleType: RoleType;
  user: UserInterface;
}
