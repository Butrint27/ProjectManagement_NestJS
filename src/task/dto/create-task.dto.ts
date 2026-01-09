import { ApiProperty } from "@nestjs/swagger";
import { TaskPriority, TaskStatus } from "../entities/task.entity";

export class CreateTaskDto {
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
