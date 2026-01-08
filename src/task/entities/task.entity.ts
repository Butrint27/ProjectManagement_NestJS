import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Board } from '../../board/entities/board.entity';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status: TaskStatus;

  @ManyToOne(() => Board, board => board.tasks)
  board: Board;

  @ManyToOne(() => User, user => user.assignedTasks, { nullable: true })
  assignedTo: User;

  @ManyToOne(() => User, user => user.createdTasks)
  createdBy: User;

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[];

  @Column({ type: 'datetime', nullable: true })
  dueDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

