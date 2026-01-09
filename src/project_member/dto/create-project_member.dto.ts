import { ApiProperty } from "@nestjs/swagger";
import { ProjectMemberRole } from "../entities/project_member.entity";

export class CreateProjectMemberDto {
    @ApiProperty()
    user: number;

    @ApiProperty()
    project: number;

    @ApiProperty({ enum: ProjectMemberRole, enumName: 'ProjectMemberRole' })
    role: ProjectMemberRole;
}
