import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  todo: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsOptional()
  @IsNumber()
  categoryID: number;
}
