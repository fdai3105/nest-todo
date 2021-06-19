import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private repository: Repository<Todo>) {}

  create(createTodoDto: CreateTodoDto) {
    return this.repository.insert(createTodoDto);
  }

  findAll() {
    return this.repository.find();
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
}
