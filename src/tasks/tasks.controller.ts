import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './DTOs/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get('/filter')
  getFilteredTask(@Query(ValidationPipe) filterDto: GetTaskFilterDto) {
    return this.tasksService.getFilteredTask(filterDto);
  }
  @Get('/all')
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    // console.log(title, description);

    return this.tasksService.createTask(createTaskDto);
  }
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ) {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
