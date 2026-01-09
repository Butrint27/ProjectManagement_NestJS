import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { User } from '../../user/entities/user.entity';

export enum CommentType {
  GENERAL = 'general',
  UPDATE = 'update',
  FEEDBACK = 'feedback',
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: CommentType,
    default: CommentType.GENERAL,
  })
  type: CommentType;

  @ManyToOne(() => Task, (task) => task.comments)
  task: Task;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}

