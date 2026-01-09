import { ApiProperty } from "@nestjs/swagger";

export class CreateBoardDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    projectId: number;
}
