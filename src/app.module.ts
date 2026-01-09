import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ProjectMemberModule } from './project_member/project_member.module';
import { ProjectModule } from './project/project.module';
import { CommentModule } from './comment/comment.module';
import { BoardModule } from './board/board.module';
import { OrganizationModule } from './organization/organization.module';
import { User } from './user/entities/user.entity';
import { Comment } from './comment/entities/comment.entity';
import { Task } from './task/entities/task.entity';
import { Project } from './project/entities/project.entity';
import { ProjectMember } from './project_member/entities/project_member.entity';
import { Board } from './board/entities/board.entity';
import { Organization } from './organization/entities/organization.entity';
import { ActivityLog } from './activity_log/entities/activity_log.entity';
import { ActivityLogModule } from './activity_log/activity_log.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'bajrami27',
      database: 'project_management_nestjs',
      entities: [User,Task,Project,ProjectMember,Comment,Board,ActivityLog,Organization],
      synchronize: false,
    }),
    UserModule,
    TaskModule,
    ProjectMemberModule,
    ProjectModule,
    CommentModule,
    BoardModule,
    ActivityLogModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
