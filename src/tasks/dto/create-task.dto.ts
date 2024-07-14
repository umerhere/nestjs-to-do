import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsDateString, IsBoolean } from 'class-validator';
import { Status, Priority } from '../enum/task.enums';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    type: String,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Details of the task',
    type: String,
  })
  @IsNotEmpty()
  details: string;

  @ApiProperty({
    description: 'Priority of the task',
    enum: Priority,
  })
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty({
    description: 'Status of the task',
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    description: 'Task due date',
    type: Date,
  })
  @IsNotEmpty()
  @IsDateString()
  due_date: Date;

  @ApiProperty({
    description: 'Is the task active',
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}