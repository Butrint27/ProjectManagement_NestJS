import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { CommentType } from '../entities/comment.entity';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @ApiProperty()
    content: string;
    
    @ApiProperty({ enum: CommentType, enumName: 'CommentType' })
    type: CommentType;
    
    @ApiProperty()
    taskId: number;
    
    @ApiProperty()
    userId: number;
}
