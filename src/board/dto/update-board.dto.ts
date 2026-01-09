import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    projectId: number;
}
