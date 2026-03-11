import { Controller, Get } from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }
}
