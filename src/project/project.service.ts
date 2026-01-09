import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { CreateProjectDto } from '../project/dto/create-project.dto';
import { UpdateProjectDto } from '../project/dto/update-project.dto';
import { Organization } from '../organization/entities/organization.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,

    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  // Create a project
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, status, organization: organizationId } = createProjectDto;

    const organization = await this.organizationRepository.findOne({
      where: { id: organizationId },
    });

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    const project = this.projectRepository.create({
      name,
      status: status || 'active',
      organization,
    });

    return await this.projectRepository.save(project);
  }

  // Get all projects
  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      relations: ['organization', 'members', 'boards'],
    });
  }

  // Get one project by id
  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['organization', 'members', 'boards'],
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  // Update a project
  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);

    if (updateProjectDto.organization) {
      const organization = await this.organizationRepository.findOne({
        where: { id: updateProjectDto.organization },
      });
      if (!organization) throw new NotFoundException('Organization not found');
      project.organization = organization;
    }

    Object.assign(project, updateProjectDto); // update remaining fields
    return await this.projectRepository.save(project);
  }

  // Delete a project
  async remove(id: number): Promise<void> {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }
}

