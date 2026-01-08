import { PartialType } from '@nestjs/swagger';
import { CreateProjectMemberDto } from './create-project_member.dto';

export class UpdateProjectMemberDto extends PartialType(CreateProjectMemberDto) {}
