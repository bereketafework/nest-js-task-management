import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { Task } from './task.entity';
import { GetTaskFilterDto } from './DTOs/get-task-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// @ApiTags('Tasks')
@Controller('tasks')
// @UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get('/filter')
  // @UseGuards(AuthGuard())
  getFilteredTask(@Query(ValidationPipe) filterDto: GetTaskFilterDto) {
    return this.tasksService.getFilteredTask(filterDto);
  }
  @Get('/all')
  @ApiOperation({ summary: 'Get all tasks' })
  @UseGuards(AuthGuard())
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
