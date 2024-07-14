import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { Status, Priority } from '../enum/task.enums';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    description: 'Title of the task',
    type: String,
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Details of the task',
    type: String,
  })
  details?: string;

  @ApiPropertyOptional({
    description: 'Priority of the task',
    enum: Priority,
  })
  priority?: Priority;

  @ApiPropertyOptional({
    description: 'Status of the task',
    enum: Status,
  })
  status?: Status;

  @ApiPropertyOptional({
    description: 'Task due date',
    type: Date,
  })
  due_date?: Date;

  @ApiPropertyOptional({
    description: 'Is the task active',
    type: Boolean,
  })
  is_active?: boolean;
}