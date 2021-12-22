import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Time } from './common.entity'

@Entity({ name: 'video' })
export class Video extends Time {

    @PrimaryGeneratedColumn({ comment: '主键，自增' })
    id: number;

    @Column({ comment: '发布者id' })
    upId: number;

    @Column({ comment: '视频标题' })
    title: string;

    @Column({ comment: '视频分类' })
    classification: number;

    @Column({ comment: '点赞数', default: 0 })
    likes: number;

    @Column({ comment: '收藏数', default: 0 })
    collections: number;

    @Column({ comment: '转发数', default: 0 })
    forward: number;

    @Column({ comment: '视频url地址' })
    url: string;

    @Column({comment:"视频封面"})
    cover:string;
}
