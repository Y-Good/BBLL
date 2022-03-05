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
import { Time } from './common.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity('video')
export class Video extends Time {
  @PrimaryGeneratedColumn({ comment: '主键，自增' })
  id: number;

  @Column({ comment: '视频标题' })
  title: string;

  @Column({ comment: '观看次数', default: 0 })
  view: number;

  @Column({ comment: '点赞数', default: 0 })
  thumbUp: number;

  @Column({ comment: '收藏数', default: 0 })
  collections: number;

  @Column({ comment: '转发数', default: 0 })
  share: number;

  @Column({ comment: '视频url地址', default: null })
  url: string;

  @Column({ comment: '视频封面', default: null })
  cover: string;

  ///一个视频对应一个用户   发布视频
  @ManyToOne(() => User)
  user: User;

  ///视频点赞
  @ManyToMany(() => User, (user) => user.thumbUpVideo)
  users: User[];

  ///视频评论
  @OneToMany(() => Comment, (comment) => comment.video)
  comments: Comment[];

  ///视频标签
  @ManyToMany(() => Tag, (tag) => tag.videos)
  @JoinTable({ name: 'video_tag' })
  tags: Tag[];

  ///视频历史记录
  @ManyToMany((type) => User, (user) => user.historyVideos)
  historyUsers: User[];

  ///分类
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category' })
  category: Category;
}
