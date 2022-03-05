import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Video } from './video.entity';

@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '分类名字', default: '默认' })
  name: string;
}
