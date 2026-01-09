import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ProjectMember } from '../../project_member/entities/project_member.entity';
import { ActivityLog } from '../../activity_log/entities/activity_log.entity';
import { Comment } from '../../comment/entities/comment.entity';

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
  GUEST = 'guest',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  // Relations
  @OneToMany(() => ProjectMember, (projectMember) => projectMember.user)
  projectMemberships: ProjectMember[];

  @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
  activityLogs: ActivityLog[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}


