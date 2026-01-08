import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  role?: UserRole;        // optional, default can be USER
  organizationId?: number; // optional if user can exist without org
}

