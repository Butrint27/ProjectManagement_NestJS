import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from '../../organization/entities/organization.entity';
import { Task } from '../../task/entities/task.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Board } from '../../board/entities/board.entity';
import { Project } from '../../project/entities/project.entity';
import { ActivityLog } from '../../activity_log/entities/activity_log.entity';
import { ProjectMember } from '../../project_member/entities/project_member.entity';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @ManyToOne(() => Organization, org => org.users, { nullable: true })
  organization: Organization;

  @OneToMany(() => Task, task => task.assignedTo)
  assignedTasks: Task[];

  @OneToMany(() => Task, task => task.createdBy)
  createdTasks: Task[];

  @OneToMany(() => Comment, comment => comment.createdBy)
  comments: Comment[];

  @OneToMany(() => Board, board => board.createdBy)
  boards: Board[];

  @OneToMany(() => Project, project => project.createdBy)
  projects: Project[];

  @OneToMany(() => ActivityLog, log => log.performedBy)
  activityLogs: ActivityLog[];

  @OneToMany(() => ProjectMember, member => member.user)
  projectMemberships: ProjectMember[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}


