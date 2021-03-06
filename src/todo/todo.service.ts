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
        category: { id: createTodoDto.categoryID },
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
    const todos = await this.repository.find({
      where: { user: user },
      order: { createdAt: 'DESC' },
    });
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

  async findByCate(categoryID: number) {
    try {
      const todos = await this.repository.find({
        where: { category: { id: categoryID } },
      });
      return new HttpResponse(HttpStatus.OK, 'success', todos);
    } catch (e) {
      return new HttpResponse(HttpStatus.OK, 'findByCate failed');
    }
  }

  async todayTasks(userID: number) {
    try {
      const todos = await this.repository.find({
        where: { user: { id: userID }, due: new Date().getDay() },
        order: { due: 'ASC' },
      });
      return new HttpResponse(HttpStatus.OK, 'success', todos);
    } catch (e) {
      return new HttpResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'todayTask failed',
      );
    }
  }

  async changeComplete(id: number, complete: boolean) {
    try {
      await this.repository.update(id, { complete: complete });
      return new HttpResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'changeComplete success',
      );
    } catch (e) {
      return new HttpResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'changeComplete failed',
      );
    }
  }
}
