import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Organization } from '../../organization/entities/organization.entity';
import { ProjectMember } from '../../project_member/entities/project_member.entity';
import { Board } from '../../board/entities/board.entity';

export enum ProjectStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  COMPLETED = 'completed',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  })
  status: ProjectStatus;

  @ManyToOne(() => Organization, (organization) => organization.projects)
  @JoinColumn({ name: 'organizationId' })
  organization: Organization;

  @OneToMany(() => ProjectMember, (projectMember) => projectMember.project)
  members: ProjectMember[];

  @OneToMany(() => Board, (board) => board.project)
  boards: Board[];
}

