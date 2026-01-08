import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    email: string;
    password: string;
    name: string;
    role?: UserRole;        // optional, default can be USER
    organizationId?: number;
}
