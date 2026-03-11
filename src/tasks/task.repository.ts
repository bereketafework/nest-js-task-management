import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enem';
import { CreateTaskDto } from './DTOs/create-task.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetTaskFilterDto } from './DTOs/get-task-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
  // async deleteTask(id: number): Promise<Task | void> {
  //   // const findTaskToDelete = this.getTaskById(id);
  //   const Task = await this.delete(id);
  //   if (!Task) {
  //     throw new BadRequestException(`Task Is Not Found With ID: ${id}`);
  //   } else {
  //     console.log('Task deleted');
  //   }
  // }
  async getFilteredTask(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = getTaskFilterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  getAllTasks(): Promise<Task[]> {
    return this.find();
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }
  async getTaskById(id: number): Promise<Task> {
    const Task = await this.findOne({ where: { id } });
    if (!Task) {
      throw new BadRequestException('Task Not Found');
    }
    return Task;
  }

  // upsateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
  //   const findTask = this.getTaskById(id);
  //   Task.status = status;
  // }
}
