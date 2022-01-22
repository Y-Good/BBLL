import { collectEnum } from 'src/common/enums/collect.enum';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Time } from './common.entity'
import { Video } from './video.entity';

@Entity('collect')
export class Collect extends Time {

    @PrimaryGeneratedColumn({ comment: '主键，自增' })
    id: number;

    @Column({ comment: '视频id' })
    videoId: number;

    @Column({ comment: '用户id' })
    userId: number;

    @Column({ comment: '直播id' })
    liveId: number;

    @Column({ comment: '收藏类型', enum: collectEnum, type: 'enum' })
    type: collectEnum;

    @OneToOne((type) => Video, video => video.id)
    @JoinColumn()
    video: Video
}
