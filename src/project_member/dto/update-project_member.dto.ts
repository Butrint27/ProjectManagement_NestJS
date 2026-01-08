import { PartialType } from '@nestjs/swagger';
import { CreateProjectMemberDto } from './create-project_member.dto';
import { ProjectRole } from '../entities/project_member.entity';

export class UpdateProjectMemberDto extends PartialType(CreateProjectMemberDto) {
    projectId: number; // FK to Project
    userId: number;    // FK to User
    role?: ProjectRole; 
}
