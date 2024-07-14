import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpException, HttpStatus } from '@nestjs/common';
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
    try {
      this.logger.log('create');
      return await this.tasksService.create(createTaskDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.tasksService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':uid')
  async findOneByUid(@Param('uid') uid: string) {
    try {
      return await this.tasksService.findOneByUid(uid);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':uid')
  async update(@Param('uid') uid: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      return await this.tasksService.update(uid, updateTaskDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':uid')
  async remove(@Param('uid') uid: string) {
    try {
      return await this.tasksService.remove(uid);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
