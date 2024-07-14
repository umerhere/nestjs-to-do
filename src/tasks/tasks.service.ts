import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import * as _ from 'lodash'

@Injectable()
export class TasksService {
  
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  
  async create(@Body() createUserDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.create(createUserDto);
    return this.taskRepository.save(task);
  }
  
  async findOneByUid(uid: string): Promise<Task | null> {
    return await this.taskRepository.findOne({
      where: {
        uid,
      },
    })
  }
  
  async findAll() {
    return await this.taskRepository.find()
  }

  async update(uid: string, updateTaskDto: Partial<UpdateTaskDto>): Promise<Task> {
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

    return await this.findOneByUid(uid);
  }

  async remove(uid: string) {
    await this.taskRepository.delete({ uid: uid })
  }
}
