import { DataSource } from 'typeorm';
import { User } from '../../ProjectManagement_NestJS/project_management_nestjs/src/user/entities/user.entity';
import { Project } from '../../ProjectManagement_NestJS/project_management_nestjs/src/project/entities/project.entity';
import { ProjectMember } from '../../ProjectManagement_NestJS/project_management_nestjs/src/project_member/entities/project_member.entity';
import { Task } from '../../ProjectManagement_NestJS/project_management_nestjs/src/task/entities/task.entity';
import { Comment } from '../../ProjectManagement_NestJS/project_management_nestjs/src/comment/entities/comment.entity';
import { ActivityLog } from '../../ProjectManagement_NestJS/project_management_nestjs/src/activity_log/entities/activity_log.entity';
import { Organization } from '../../ProjectManagement_NestJS/project_management_nestjs/src/organization/entities/organization.entity';
import { Board } from '../../ProjectManagement_NestJS/project_management_nestjs/src/board/entities/board.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'bajrami27',
  database: 'project_management_nestjs',
  entities: [User, Project, ProjectMember, Task, Comment, ActivityLog, Organization, Board],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // important for migrations
  logging: true,
});
