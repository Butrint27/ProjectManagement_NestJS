import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Organization } from '../../organization/entities/organization.entity';
import { User } from '../../user/entities/user.entity';
import { Board } from '../../board/entities/board.entity';
import { ProjectMember } from '../../project_member/entities/project_member.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Organization, org => org.projects)
  organization: Organization;

  @ManyToOne(() => User, user => user.projects)
  createdBy: User;

  @OneToMany(() => Board, board => board.project)
  boards: Board[];

  @OneToMany(() => ProjectMember, member => member.project)
  members: ProjectMember[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

