import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Board } from 'src/board/entities/board.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,

    @InjectRepository(Board)
    private readonly boardRepo: Repository<Board>,
  ) {}

  
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const board = await this.boardRepo.findOne({
      where: { id: createTaskDto.boardId },
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    const task = this.taskRepo.create({
      ...createTaskDto,
      board,
    });

    return await this.taskRepo.save(task);
  }

  
  async find(): Promise<Task[]> {
    return await this.taskRepo.find({
      relations: ['board'],
    });
  }

  
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['board'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (updateTaskDto.boardId) {
      const board = await this.boardRepo.findOne({
        where: { id: updateTaskDto.boardId },
      });

      if (!board) {
        throw new NotFoundException('Board not found');
      }

      task.board = board;
    }

    Object.assign(task, updateTaskDto);

    return await this.taskRepo.save(task);
  }

  
  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id);
    return await this.taskRepo.remove(task);
  }
}

