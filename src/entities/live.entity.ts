import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Time } from './common.entity'

@Entity('live')
export class Live extends Time {

    @PrimaryGeneratedColumn({ comment: '主键，自增' })
    id: number;

    @Column({ comment: 'upId' })
    upId: number;

    @Column({ comment: '直播标题' })
    title: String;

    @Column({ comment: '直播分类' })
    classification: number;

    @Column({ comment: '直播url地址' })
    url: string;
}
