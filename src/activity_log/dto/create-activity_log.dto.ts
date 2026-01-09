import { ApiProperty } from "@nestjs/swagger";
import { ActivityAction } from "../entities/activity_log.entity";

export class CreateActivityLogDto {
    @ApiProperty()
    action: ActivityAction;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    taskId: number;   
}
