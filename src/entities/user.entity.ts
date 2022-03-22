import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Time } from './base.entity';
import { Video } from './video.entity';
import { Comment } from './comment.entity';
import { Histroy } from './histroy.entity';

@Entity('user')
export class User extends Time {
  @PrimaryGeneratedColumn({ comment: '用户ID' })
  id: number;

  @Column({ comment: '账号' })
  number: string;

  @Column({ comment: '密码', select: false })
  password: string;

  @Column({ comment: '昵称' })
  nickname: string;

  @Column({ comment: '签名', length: 50, default: null })
  signature: string;

  @Column({ comment: '头像', default: '/avatars/default/avatar.png' })
  avatar: string;

  @Column({ comment: '电话', default: null })
  mobile: string;

  @Column({ comment: '性别,0未知,1男,2女', type: 'integer', default: 0 })
  gender: number;

  @Column({ comment: '生日', type: 'date', default: null })
  birthday: Date;

  @Column({ comment: '0超级管理员1普通', default: 1 })
  type: number;

  ///视频
  @OneToMany(() => Video, (video) => video.user)
  videos: Video[];

  ///点赞 视频
  @ManyToMany((type) => Video, (video) => video.users)
  @JoinTable({ name: 'thumb_up_video' })
  thumbUpVideo: Video[];

  ///点赞评论
  @ManyToMany((type) => Comment, (comment) => comment.users)
  @JoinTable({ name: 'thumb_up_comment' })
  thumbUpComment: Comment[];

  ///评论
  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  ///回复
  @ManyToMany((type) => Comment, (comment) => comment.replyUser)
  replyComments: Comment[];
  // ///关注的人
  // @ManyToMany((type) => User, (user) => user.follows)
  // @JoinTable({
  //   name: 'follow',
  //   joinColumn: { name: 'userId' },
  //   inverseJoinColumn: { name: 'followId' },
  // })
  // follows: User[];

  ///历史
  @OneToMany(() => Histroy, (history) => history.user)
  history: Histroy[];

  // ///通知
  // @OneToMany(() => Notify, (notify) => notify.toUser)
  // notify: Notify[];
}
