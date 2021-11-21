import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Time } from './common.entity'

@Entity({ name: 'collection' })

export class Collection extends Time {

    @PrimaryGeneratedColumn({ comment: '主键，自增' })
    id: number;

    @Column({ comment: '视频id' })
    videoId: number;

    @Column({ comment: '用户id' })
    userId: number;

    @Column({comment:'收藏类型'})
    type:string;
}
