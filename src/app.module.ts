import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrganisationModule } from './organisation/organisation.module';
import { ProjectModule } from './project/project.module';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { ActivityLogModule } from './activity_log/activity_log.module';
import { OrganizationModule } from './organization/organization.module';
import { ProjectMemberModule } from './project_member/project_member.module';

@Module({
  imports: [UserModule, OrganisationModule, ProjectModule, BoardModule, TaskModule, CommentModule, ActivityLogModule, OrganizationModule, ProjectMemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
