import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  //   constructor(
  //     @InjectEntityManager()
  //     // private userRepository: UserRepository,
  //   ) {}
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
}
