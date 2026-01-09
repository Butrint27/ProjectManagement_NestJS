import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateActivityLogDto } from './create-activity_log.dto';
import { ActivityAction } from '../entities/activity_log.entity';

export class UpdateActivityLogDto extends PartialType(CreateActivityLogDto) {
    @ApiProperty()
    action: ActivityAction;

    @ApiProperty()
    userId: number;
    
    @ApiProperty()
    taskId: number; 
}
