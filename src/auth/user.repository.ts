import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { signupDTO } from './DTOs/signup.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  getAllUsers(): Promise<User[]> {
    return this.find({
      where: { isActive: true },
      order: { username: 'ASC' },
    });
  }

  async createUser(signupDTO: signupDTO): Promise<User> {
    const { username, password } = signupDTO;
    const salt = await bcrypt.genSalt();
    const existingUser = await this.findOne({ where: { username } });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);
    await user.save();
    return user;
  }
  async validateUserPassword(signupDTO: signupDTO) {
    const { username, password } = signupDTO;
    const user = await this.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new BadRequestException('Invalid credentials');
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
