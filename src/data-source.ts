import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { User } from './user/entities/user.entity';
import { Project } from './project/entities/project.entity';
import { ProjectMember } from './project_member/entities/project_member.entity';
import { Task } from './task/entities/task.entity';
import { Comment } from './comment/entities/comment.entity';
import { ActivityLog } from './activity_log/entities/activity_log.entity';
import { Board } from './board/entities/board.entity';
import { Organization } from './organization/entities/organization.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'bajrami27',
  database: 'project_management_nestjs',

  entities: [
    User,
    Project,
    ProjectMember,
    Task,
    Comment,
    ActivityLog,
    Board,
    Organization,
  ],

  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});

export default AppDataSource;


