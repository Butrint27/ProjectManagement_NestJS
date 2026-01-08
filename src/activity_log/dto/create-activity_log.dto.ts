import { ActivityEntity } from "../entities/activity_log.entity";

export class CreateActivityLogDto {
  entity: ActivityEntity;
  entityId: number;
  action: string;
  performedById: number;
}
