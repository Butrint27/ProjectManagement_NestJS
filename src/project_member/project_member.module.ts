import { Module } from '@nestjs/common';
import { ProjectMemberService } from './project_member.service';
import { ProjectMemberController } from './project_member.controller';

@Module({
  controllers: [ProjectMemberController],
  providers: [ProjectMemberService],
})
export class ProjectMemberModule {}
