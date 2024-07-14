import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { Status, Priority } from './enum/task.enums';

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
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: Status })
  @ApiQuery({ name: 'priority', required: false, enum: Priority })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: Status,
    @Query('priority') priority?: Priority,
  ) {
    try {
      return await this.tasksService.findAll(page, limit, status, priority);
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
