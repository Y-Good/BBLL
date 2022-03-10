import { NotifyType } from 'src/common/enums/notify.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Time } from './base.entity';
import { Comment } from './comment.entity';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity({ name: 'notify' })
export class Notify extends Time {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '消息类型',
    enum: NotifyType,
    type: 'enum',
    default: NotifyType.THUMBUP,
  })
  type: NotifyType;

  @Column({ comment: '是否已读', default: 0 })
  isRead: number;

  @ManyToOne(() => User)
  @JoinColumn()
  fromUser: User;

  @ManyToOne(() => Video)
  @JoinColumn()
  video: Video;

  @ManyToOne(() => Comment)
  @JoinColumn()
  comment: Comment;
}
