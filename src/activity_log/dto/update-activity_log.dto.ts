import { PartialType } from '@nestjs/swagger';
import { CreateActivityLogDto } from './create-activity_log.dto';
import { ActivityEntity } from '../entities/activity_log.entity';

export class UpdateActivityLogDto extends PartialType(CreateActivityLogDto) {
  entity: ActivityEntity;
  entityId: number;
  action: string;
  performedById: number;
}
