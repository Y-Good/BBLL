import { NotifyType } from 'src/common/enums/notify.enum';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity({ name: 'notify' })
export class Notify extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '消息类型', enum: NotifyType, type: 'enum' })
  type: NotifyType;

  @Column({ comment: '是否已读', default: 0 })
  isRead: number;

  @ManyToOne(() => User)
  @JoinColumn()
  fromUser: User;

  @ManyToOne(() => User)
  @JoinColumn()
  toUser: User;

  @ManyToOne(() => Video)
  @JoinColumn()
  video: Video;
}
