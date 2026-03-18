import { Task } from 'src/tasks/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ nullable: true })
  salt: string;
  @OneToMany((type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
