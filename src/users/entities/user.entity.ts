import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'typeorm/util/StringUtils';
import { Todo } from '../../todo/entities/todo.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  pass: string;

  @Column()
  phone: string;

  @OneToMany(() => Todo, (object) => object.user)
  todos: Todo[];

  @OneToMany(() => Category, (object) => object.user)
  categories: Category[];
}
