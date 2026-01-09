import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectMemberDto } from './dto/create-project_member.dto';
import { UpdateProjectMemberDto } from './dto/update-project_member.dto';
import { Repository } from 'typeorm';
import { ProjectMember } from './entities/project_member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProjectMemberService {
  constructor(
    @InjectRepository(ProjectMember)
    private readonly projectMemberRepo: Repository<ProjectMember>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}


  async create(createDto: CreateProjectMemberDto): Promise<ProjectMember> {
    const user = await this.userRepo.findOne({ where: { id: createDto.user } });
    if (!user) throw new NotFoundException('User not found');

    const project = await this.projectRepo.findOne({ where: { id: createDto.project } });
    if (!project) throw new NotFoundException('Project not found');

    const newMember = this.projectMemberRepo.create({
      user,
      project,
      role: createDto.role ?? 'member',
    });

    return await this.projectMemberRepo.save(newMember);
  }


  async update(id: number, updateDto: UpdateProjectMemberDto): Promise<ProjectMember> {
    const member = await this.projectMemberRepo.findOne({ where: { id }, relations: ['user', 'project'] });
    if (!member) throw new NotFoundException('ProjectMember not found');

    if (updateDto.role) member.role = updateDto.role;

    if (updateDto.user) {
      const user = await this.userRepo.findOne({ where: { id: updateDto.user } });
      if (!user) throw new NotFoundException('User not found');
      member.user = user;
    }

    if (updateDto.project) {
      const project = await this.projectRepo.findOne({ where: { id: updateDto.project } });
      if (!project) throw new NotFoundException('Project not found');
      member.project = project;
    }

    return await this.projectMemberRepo.save(member);
  }


  async findAll(): Promise<ProjectMember[]> {
    return await this.projectMemberRepo.find({ relations: ['user', 'project'] });
  }


  async findOne(id: number): Promise<ProjectMember> {
    const member = await this.projectMemberRepo.findOne({
      where: { id },
      relations: ['user', 'project'],
    });
    if (!member) throw new NotFoundException('ProjectMember not found');
    return member;
  }


  async remove(id: number): Promise<ProjectMember> {
    const member = await this.projectMemberRepo.findOne({ where: { id } });
    if (!member) throw new NotFoundException('ProjectMember not found');
    await this.projectMemberRepo.remove(member);
    return member;
  }
}

