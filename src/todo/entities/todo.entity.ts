import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todo: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ default: false })
  complete: boolean;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => User, (object) => object.id, { nullable: false })
  user: User;

  @ManyToOne(() => Category, (object) => object.todos)
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
