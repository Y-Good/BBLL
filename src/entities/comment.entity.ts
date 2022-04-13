import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn({ comment: '主键，自增' })
  id: number;

  @Column({ comment: '内容' })
  content: string;

  @Column({
    comment: '评论层级，1为一级评论，2为二级评论',
    default: 1,
    type: 'integer',
  })
  level: number;

  @Column({
    comment: '评论回复数',
    default: 0,
  })
  replyCount: number;

  @Column({
    comment: '点赞',
    default: 0,
  })
  thumbUpCount: number;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  ///评论那条视频
  @ManyToOne(() => Video, (video) => video.comments, { onDelete: 'CASCADE' })
  @JoinColumn()
  video: Video;

  ///那个评论
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user: User;

  ///回复谁
  @ManyToOne(() => User, (user) => user.replyComments)
  @JoinColumn()
  replyUser: User;

  ///用户点赞评论
  @ManyToMany(() => User, (user) => user.thumbUpComment)
  @JoinTable({ name: 'thumb_up_comment' })
  users: User[];

  ///二级评论
  @ManyToMany(() => Comment, (comment) => comment.secondComment, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'comment_second',
    joinColumn: { name: 'parentId' },
    inverseJoinColumn: { name: 'childrenId' },
  })
  secondComment: Comment[];
}
