import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { TaskPriority, TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @ApiProperty()
    title: string;
    
    @ApiProperty()
    description: string;
    
    @ApiProperty({ enum: TaskStatus, enumName: 'TaskStatus' })
    status: TaskStatus;
    
    @ApiProperty({ enum: TaskPriority, enumName: 'TaskPriority' })
    priority: TaskPriority;
    
    @ApiProperty()
    boardId: number;
}
