import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum ActivityEntity {
  USER = 'USER',
  PROJECT = 'PROJECT',
  BOARD = 'BOARD',
  TASK = 'TASK',
  COMMENT = 'COMMENT',
}

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ActivityEntity })
  entity: ActivityEntity;

  @Column()
  entityId: number;

  @Column()
  action: string;

  @ManyToOne(() => User, user => user.activityLogs, { nullable: true })
  performedBy: User;

  @CreateDateColumn()
  createdAt: Date;
}

