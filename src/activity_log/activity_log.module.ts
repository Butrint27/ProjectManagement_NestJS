import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity_log.service';
import { ActivityLogController } from './activity_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activity_log.entity';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog, Task, User])],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
})
export class ActivityLogModule {}
