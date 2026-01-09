import { ApiProperty } from "@nestjs/swagger";
import { CommentType } from "../entities/comment.entity";

export class CreateCommentDto {
    @ApiProperty()
    content: string;

    @ApiProperty({ enum: CommentType, enumName: 'CommentType' })
    type: CommentType;

    @ApiProperty()
    taskId: number;

    @ApiProperty()
    userId: number;
}
