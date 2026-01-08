import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity_log.service';
import { ActivityLogController } from './activity_log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityLog } from './entities/activity_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog])],
  controllers: [ActivityLogController],
  providers: [ActivityLogService],
})
export class ActivityLogModule {}
