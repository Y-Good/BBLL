import { collectEnum } from 'src/common/enums/collect.enum';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Time } from './common.entity'
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('collect')
export class Collect extends Time {

    @PrimaryGeneratedColumn({ comment: '主键，自增' })
    id: number;

    // @Column({ comment: '视频id', default: null })
    // videoId: number;

    @Column({ comment: '用户id', default: null })
    userId: number;

    @Column({ comment: '直播id', default: null })
    liveId: number;

    @Column({ comment: '收藏类型', enum: collectEnum, type: 'enum' })
    type: collectEnum;

    // @Column({comment:'关注哪个的id'})
    // followId: number;

    @OneToOne((type) => Video, video => video.id)
    @JoinColumn()
    video: Video

    @OneToOne((type) => User, user => user.id)
    @JoinColumn()
    follow: User
}
