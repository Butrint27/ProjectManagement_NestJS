import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Task } from '../../task/entities/task.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Task, task => task.comments, { onDelete: 'CASCADE' })
  task: Task;

  @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;
}

