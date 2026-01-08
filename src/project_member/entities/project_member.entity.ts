import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';

export enum ProjectRole {
  VIEWER = 'VIEWER',
  EDITOR = 'EDITOR',
  ADMIN = 'ADMIN',
}

@Entity()
export class ProjectMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, project => project.members, { onDelete: 'CASCADE' })
  project: Project;

  @ManyToOne(() => User, user => user.projectMemberships, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'enum', enum: ProjectRole, default: ProjectRole.VIEWER })
  role: ProjectRole;
}

