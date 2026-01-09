import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Task } from '../task/entities/task.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { content, type, taskId, userId } = createCommentDto;

    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const comment = this.commentRepository.create({
      content,
      type,
      task,
      user,
    });

    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find({
      relations: ['task', 'user'],
    });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['task', 'user'],
    });

    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(id);

    if (updateCommentDto.taskId) {
      const task = await this.taskRepository.findOne({
        where: { id: updateCommentDto.taskId },
      });
      if (!task) throw new NotFoundException('Task not found');
      comment.task = task;
    }

    if (updateCommentDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateCommentDto.userId },
      });
      if (!user) throw new NotFoundException('User not found');
      comment.user = user;
    }

    Object.assign(comment, updateCommentDto);

    return this.commentRepository.save(comment);
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepository.remove(comment);
  }
}

