import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Time } from './base.entity'

@Entity({ name: 'barrage' })
export class Barrage extends Time {

    @PrimaryGeneratedColumn({ comment: '主键，自增' })
    id: number;

    @Column({ comment: '发布者id' })
    userId: number;


    @Column({ comment: '对应视频id', default: 0 })
    videoId: number;

    @Column({ comment: '弹幕内容' })
    content: string;


}

