import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import * as _ from 'lodash';

@Injectable()
export class TasksService {
  
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const task = await this.taskRepository.create(createTaskDto);
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }
  
  async findOneByUid(uid: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { uid } });
      if (!task) {
        throw new NotFoundException(`Task with UID '${uid}' not found`);
      }
      return task;
    } catch (error) {
      throw new NotFoundException('Failed to find task');
    }
  }
  
  async findAll(): Promise<Task[]> {
    try {
      return await this.taskRepository.find();
    } catch (error) {
      throw new NotFoundException('Failed to fetch tasks');
    }
  }

  async update(uid: string, updateTaskDto: Partial<UpdateTaskDto>): Promise<Task> {
    try {
      const existingTask = await this.findOneByUid(uid);

      const {
        title,
        details,
        priority,
        status,
        due_date,
        is_active,
      } = updateTaskDto;

      let dataToUpdate = {};
      if (title) dataToUpdate = { ...dataToUpdate, title };
      if (details) dataToUpdate = { ...dataToUpdate, details };
      if (priority) dataToUpdate = { ...dataToUpdate, priority };
      if (status) dataToUpdate = { ...dataToUpdate, status };
      if (due_date) dataToUpdate = { ...dataToUpdate, due_date };
      if (is_active !== undefined) dataToUpdate = { ...dataToUpdate, is_active };

      if (!_.isEmpty(dataToUpdate)) {
        await this.taskRepository.update({ uid }, dataToUpdate);
      }

      return await this.findOneByUid(uid); // Return updated task
    } catch (error) {
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async remove(uid: string): Promise<void> {
    try {
      const existingTask = await this.findOneByUid(uid);
      if (!existingTask) {
        throw new NotFoundException(`Task with UID '${uid}' not found`);
      }

      const result = await this.taskRepository.delete({ uid });
      if (result.affected === 0) {
        throw new NotFoundException(`Task with UID '${uid}' not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
