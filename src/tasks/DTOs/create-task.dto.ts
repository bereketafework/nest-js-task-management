import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The title of the task' })
  title: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  description: string;
}
