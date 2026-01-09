import { ApiProperty } from "@nestjs/swagger";
import { ProjectStatus } from "../entities/project.entity";

export class CreateProjectDto {
    @ApiProperty()
    name: string;

    @ApiProperty({ enum: ProjectStatus, enumName: 'ProjectStatus' })
    status: ProjectStatus

    @ApiProperty()
    organization: number;
}
