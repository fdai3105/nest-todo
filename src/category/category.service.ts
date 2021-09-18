import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { HttpResponse } from '../http-response';
import { UsersService } from '../users/users.service';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
    private readonly usersService: UsersService,
    private readonly todoService: TodoService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, userEmail: string) {
    try {
      const user = await this.usersService.findByEmail(userEmail);
      const params = { ...createCategoryDto, user: user };
      await this.repository.insert(params);
      return new HttpResponse(HttpStatus.OK, 'created success');
    } catch (e) {
      throw new HttpException('something wrong: ' + e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(id: number) {
    try {
      const arr = [];
      const categories = await this.repository.find({
        where: { user: { id: id } },
      });
      for (const category of categories) {
        const todos = await this.todoService.findByCate(category);
        arr.push({
          ...category,
          total: todos.length,
          completed: todos.filter((e) => e.complete).length,
        });
      }
      return new HttpResponse(HttpStatus.OK, 'success', arr);
    } catch (e) {
      throw new HttpException('something wrong: ' + e, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
