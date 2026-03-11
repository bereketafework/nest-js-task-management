import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateTaskDto } from './DTOs/create-task.dto';

import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskFilterDto } from './DTOs/get-task-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  // async getTaskById(id: number): Promise<Task> {
  //   const found = await this.taskRepository.findOne({ where: { id } });
  //   if (!found) {
  //     throw new BadRequestException('Task not found');
  //   }
  //   return found;
  // }

  // async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
  //   const { title, description } = createTaskDto;

  //   const task = new Task();
  //   task.title = title;
  //   task.description = description;
  //   task.status = TaskStatus.OPEN;
  //   await task.save();

  //   return task;
  // }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  getFilteredTask(getTaskFilterDto: GetTaskFilterDto) {
    return this.taskRepository.getFilteredTask(getTaskFilterDto);
  }
  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAllTasks();
  }
  getTaskById(id: number): Promise<Task> {
    return this.taskRepository.getTaskById(id);
  }
  async deleteTask(id: number): Promise<Task | void> {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new BadRequestException(`Task with ID ${id} not found`);
    }
    console.log(`Task with ID ${id} deleted`);
    console.log(result);
  }
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid.v4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // getTaskById(id: string) {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new BadRequestException('Task not found');
  //   }
  //   return found;
  // }
  // deleteTaskById(id: string) {
  //   const found = this.getTaskById(id);
  //   const tasktodelet = (this.tasks = this.tasks.filter(
  //     (task) => task.id !== found.id,
  //     console.log('Task with id ' + id + ' is deleted'),
  //   ));
  //   console.log(id + ' task is deleted');
  //   console.log(this.tasks.length + ' tasks are left');
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   if (!task) {
  //     return new Error('Task not found');
  //   }
  //   if (!Object.values(TaskStatus).includes(status)) {
  //     return new Error('Invalid status');
  //   }
  //   task.status = status;
  //   return task;
  // }
  // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
}
