import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { BoardModule } from './board/board.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { ActivityLogModule } from './activity_log/activity_log.module';
import { OrganizationModule } from './organization/organization.module';
import { ProjectMemberModule } from './project_member/project_member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board/entities/board.entity';
import { Organization } from './organization/entities/organization.entity';
import { ActivityLog } from './activity_log/entities/activity_log.entity';
import { Task } from './task/entities/task.entity';
import { ProjectMember } from './project_member/entities/project_member.entity';
import { Project } from './project/entities/project.entity';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'bajrami27',
      database: 'project_management_nestjs',
      entities: [User,Project,ProjectMember,Task,Comment,ActivityLog,Organization,Board],
      synchronize: false,
    }),
    UserModule, 
    ProjectModule, 
    BoardModule,
    TaskModule, 
    CommentModule, 
    ActivityLogModule, 
    OrganizationModule,
    ProjectMemberModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
