import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectMemberService } from './project_member.service';
import { CreateProjectMemberDto } from './dto/create-project_member.dto';
import { UpdateProjectMemberDto } from './dto/update-project_member.dto';

@Controller('project-member')
export class ProjectMemberController {
  constructor(private readonly projectMemberService: ProjectMemberService) {}

  @Post()
  async create(@Body() createDto: CreateProjectMemberDto) {
    return await this.projectMemberService.create(createDto);
  }

  @Get()
  async findAll() {
    return await this.projectMemberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectMemberService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateProjectMemberDto) {
    return await this.projectMemberService.update(+id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.projectMemberService.remove(+id);
  }
}
