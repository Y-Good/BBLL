import { CollectEnum } from 'src/common/enums/collect.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Time } from './base.entity';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('collect')
export class Collect extends Time {
  @PrimaryGeneratedColumn({ comment: '主键，自增' })
  id: number;

  // @Column({ comment: '视频id', default: null })
  // videoId: number;
  @ManyToOne((type) => User)
  @JoinColumn()
  user: User;

  // @Column({ comment: '直播id', default: null })
  // liveId: number;

  @Column({ comment: '收藏类型', enum: CollectEnum, type: 'enum' })
  type: CollectEnum;

  // @Column({comment:'关注哪个的id'})
  // followId: number;

  @ManyToOne((type) => Video)
  @JoinColumn()
  video: Video;

  @ManyToOne((type) => User)
  @JoinColumn()
  follow: User;
}
