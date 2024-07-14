import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    this.logger.log('create');
    return await this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get(':uid')
  async findOneByUid(@Param('uid') uid: string) {
    return await this.tasksService.findOneByUid(uid);
  }

  @Patch(':uid')
  async update(@Param('uid') uid: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.tasksService.update(uid, updateTaskDto);
  }

  @Delete(':uid')
  async remove(@Param('uid') uid: string) {
    return await this.tasksService.remove(uid);
  }
}
