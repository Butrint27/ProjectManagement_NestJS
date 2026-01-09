import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity_log.entity';
import { CreateActivityLogDto } from './dto/create-activity_log.dto';
import { UpdateActivityLogDto } from './dto/update-activity_log.dto';
import { User } from '../user/entities/user.entity';
import { Task } from '../task/entities/task.entity';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectRepository(ActivityLog)
    private readonly activityLogRepository: Repository<ActivityLog>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // CREATE
  async create(createDto: CreateActivityLogDto): Promise<ActivityLog> {
    const user = await this.userRepository.findOne({
      where: { id: createDto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const task = await this.taskRepository.findOne({
      where: { id: createDto.taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const activityLog = this.activityLogRepository.create({
      action: createDto.action,
      user,
      task,
    });

    return this.activityLogRepository.save(activityLog);
  }

  // READ ALL
  async findAll(): Promise<ActivityLog[]> {
    return this.activityLogRepository.find({
      relations: ['user', 'task'],
      order: { createdAt: 'DESC' },
    });
  }

  // READ ONE
  async findOne(id: number): Promise<ActivityLog> {
    const activityLog = await this.activityLogRepository.findOne({
      where: { id },
      relations: ['user', 'task'],
    });

    if (!activityLog) {
      throw new NotFoundException(`ActivityLog #${id} not found`);
    }

    return activityLog;
  }

  // UPDATE
  async update(
    id: number,
    updateDto: UpdateActivityLogDto,
  ): Promise<ActivityLog> {
    const activityLog = await this.findOne(id);

    if (updateDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateDto.userId },
      });
      if (!user) throw new NotFoundException('User not found');
      activityLog.user = user;
    }

    if (updateDto.taskId) {
      const task = await this.taskRepository.findOne({
        where: { id: updateDto.taskId },
      });
      if (!task) throw new NotFoundException('Task not found');
      activityLog.task = task;
    }

    if (updateDto.action) {
      activityLog.action = updateDto.action;
    }

    return this.activityLogRepository.save(activityLog);
  }

  // DELETE
  async remove(id: number): Promise<void> {
    const result = await this.activityLogRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`ActivityLog #${id} not found`);
    }
  }
}

