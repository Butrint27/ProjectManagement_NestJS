import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectMemberDto } from './create-project_member.dto';
import { ProjectMemberRole } from '../entities/project_member.entity';

export class UpdateProjectMemberDto extends PartialType(CreateProjectMemberDto) {
    @ApiProperty()
    user: number;
    
    @ApiProperty()
    project: number;
    
    @ApiProperty({ enum: ProjectMemberRole, enumName: 'ProjectMemberRole' })
    role: ProjectMemberRole;
}
