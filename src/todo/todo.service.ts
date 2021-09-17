import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { HttpResponse } from '../http-response';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private repository: Repository<Todo>,
    private readonly usersService: UsersService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userEmail: string) {
    try {
      const user = await this.usersService.findByEmail(userEmail);
      await this.repository.insert({
        todo: createTodoDto.todo,
        desc: createTodoDto.desc,
        user: user,
      });
      return new HttpResponse(HttpStatus.OK, 'created success');
    } catch (e) {
      throw new HttpException(
        'something wrong:' + e,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(email: string) {
    const user = await this.usersService.findByEmail(email);
    const todos = await this.repository.find({ where: { user: user } });
    return new HttpResponse(HttpStatus.OK, 'success', todos);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.repository.update(id, updateTodoDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }

  async findByCate(category: Category) {
    return this.repository.find({ where: { category: category } });
  }
}
