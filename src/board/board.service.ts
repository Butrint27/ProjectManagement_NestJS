import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class BoardService {
    constructor(
      @InjectRepository(Board)
      private readonly boardRepo: Repository<Board>,

      @InjectRepository(Project)
      private readonly projectRepo: Repository<Project>      
    ){}

    async create(createBoardDto: CreateBoardDto): Promise<Board>{
       const { name, projectId } = createBoardDto;

       const project = await this.projectRepo.findOne({ where: { id: projectId } });
       if (!project) {
        throw new NotFoundException(`Project with id ${projectId} not found`);
       }

       const board = this.boardRepo.create({ name, project });
       return this.boardRepo.save(board);     
    }

    async update(id: number, updateBoardDto: UpdateBoardDto): Promise<Board>{
      const board = await this.boardRepo.findOne({ where: { id }, relations: ['project'] });
      if (!board) {
        throw new NotFoundException(`Board with id ${id} not found`);
      }

   
      if (updateBoardDto.name) {
        board.name = updateBoardDto.name;
      }

      if (updateBoardDto.projectId) {
        const project = await this.projectRepo.findOne({ where: { id: updateBoardDto.projectId } });
        if (!project) {
            throw new NotFoundException(`Project with id ${updateBoardDto.projectId} not found`);
        }
        board.project = project;
      }

      return this.boardRepo.save(board);
    }

    async find(): Promise<Board[]>{
      return this.boardRepo.find({
        relations: ['project', 'tasks'],
      });
    }

    async findOne(id: number): Promise<Board>{
      const board = await this.boardRepo.findOne({
        where: { id },
        relations: ['project', 'tasks'],
      });

      if (!board) {
        throw new NotFoundException(`Board with id ${id} not found`);
      }

      return board;
    }

    async remove(id: number){
      const board = await this.boardRepo.findOne({ where: { id } });
      if (!board) throw new NotFoundException('Board not found');
      await this.boardRepo.remove(board);
      return board;
    }
}
