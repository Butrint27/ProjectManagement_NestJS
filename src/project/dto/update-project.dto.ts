import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { ProjectStatus } from '../entities/project.entity';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @ApiProperty()
    name: string;
    
    @ApiProperty({ enum: ProjectStatus, enumName: 'ProjectStatus' })
    status: ProjectStatus
    
    @ApiProperty()
    organization: number;
}
