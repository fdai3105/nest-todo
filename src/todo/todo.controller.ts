import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto, req.user.email);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req) {
    return this.todoService.findAll(req.user.email);
  }

  @Get()
  findOne(@Query('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.todoService.remove(+id);
  }

  @Get('today-tasks')
  @UseGuards(JwtAuthGuard)
  getTodayTask(@Req() req) {
    return this.todoService.todayTasks(req.user.id);
  }

  @Get('find-by-category')
  @UseGuards(JwtAuthGuard)
  findByCategory(@Query('id') id: number) {
    return this.todoService.findByCate(id);
  }

  @Post('change-complete')
  @UseGuards(JwtAuthGuard)
  changeComplete(@Body() body) {
    return this.todoService.changeComplete(body.id, body.complete);
  }
}
