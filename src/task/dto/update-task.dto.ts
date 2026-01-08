import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
     title: string;
     description?: string;
     status?: TaskStatus;    // optional, default: TODO
     boardId: number;        // FK to Board
     assignedToId?: number;  // optional FK to User
     createdById: number;    // FK to User
     dueDate?: Date; 
}
