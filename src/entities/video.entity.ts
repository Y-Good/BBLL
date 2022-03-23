import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Comment } from './comment.entity';
import { Time } from './base.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';
import { Histroy } from './histroy.entity';
import { Notify } from './notify.entity';

@Entity('video')
export class Video extends Time {
  @PrimaryGeneratedColumn({ comment: '主键，自增' })
  id: number;

  @Column({ comment: '视频标题' })
  title: string;

  @Column({ comment: '观看次数', default: 0 })
  view: string;

  @Column({ comment: '点赞数', default: 0 })
  thumbUp: string;

  @Column({ comment: '收藏数', default: 0 })
  collections: string;

  // @Column({ comment: '转发数', default: 0 })
  // share: number;

  @Column({ comment: '视频url地址', default: null })
  url: string;

  @Column({ comment: '视频封面', default: null })
  cover: string;

  @Column({ comment: '视频时长', default: '0' })
  duration: string;

  ///一个视频对应一个用户   发布视频
  @ManyToOne(() => User)
  user: User;

  ///视频点赞
  @ManyToMany(() => User, (user) => user.thumbUpVideo)
  users: User[];

  ///视频评论
  @OneToMany(() => Comment, (comment) => comment.video, { onDelete: 'CASCADE' })
  comments: Comment[];

  ///视频标签
  @ManyToMany(() => Tag, (tag) => tag.videos)
  @JoinTable({ name: 'video_tag' })
  tags: Tag[];

  ///分类
  // @ManyToOne(() => Category)
  // @JoinColumn({ name: 'category' })
  // category: Category;

  ///历史记录  也可作为播放量
  @OneToMany(() => Histroy, (history) => history.video, {
    onDelete: 'CASCADE',
  })
  histroy: Histroy[];

  ///通知
  @ManyToOne(() => Notify)
  notify: Notify;
}
