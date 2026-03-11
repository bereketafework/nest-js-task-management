import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { signupDTO } from './DTOs/signup.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  //   constructor(
  //     @InjectEntityManager()
  //     // private userRepository: UserRepository,
  //   ) {}
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }
  async signup(signupDto: signupDTO): Promise<User> {
    return this.userRepository.createUser(signupDto);
  }
  // async validateUserPassword(signupDto: signupDTO): Promise<string | User> {
  //   return await this.userRepository.validateUserPassword(signupDto);
  // }
  async signin(signupDto: signupDTO) {
    const user = await this.userRepository.validateUserPassword(signupDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      username: user.username,
      id: user.id,
      isActive: user.isActive,
    };
    return { accessToken: this.jwtService.sign(payload) };
  }
  // async verifyToken(token: string): Promise<any> {
  //   try {
  //     const decoded = await this.jwtService.verify(token);
  //     console.log('Token is valid:');
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid token');
  //   }
  // }
}
