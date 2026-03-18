import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { signupDTO } from './DTOs/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }
  @Post('/signup')
  signup(@Body(ValidationPipe) signupDto: signupDTO): Promise<User> {
    return this.authService.signup(signupDto);
  }
  @Post('/signin')
  signin(@Body(ValidationPipe) signupDto: signupDTO) {
    return this.authService.signin(signupDto);
  }
  @Post('/verify')
  @ApiBearerAuth()
  test(@GetUser() user: User) {
    console.log(user);
  }
}
