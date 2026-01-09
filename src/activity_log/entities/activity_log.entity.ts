import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Task } from '../../task/entities/task.entity';

export enum ActivityAction {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  COMMENTED = 'commented',
}

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ActivityAction,
  })
  action: ActivityAction;

  @ManyToOne(() => User, (user) => user.activityLogs)
  user: User;

  @ManyToOne(() => Task, (task) => task.activityLogs)
  task: Task;

  @CreateDateColumn()
  createdAt: Date;
}

