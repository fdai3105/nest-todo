import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { Category } from './entities/category.entity';
import { TodoModule } from 'src/todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    AuthModule,
    UsersModule,
    TodoModule,
  ],
  exports: [TypeOrmModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
