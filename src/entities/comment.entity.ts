import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Time } from './common.entity'

@Entity({ name: 'comment' })
export class Comment extends Time {

    @PrimaryGeneratedColumn({ comment: '主键，自增' })
    id: number;

    @Column({ comment: '所属视频Id' })
    vedioId: number;

    @Column({ comment: '评论者id' })
    userId: number;

    @Column({ comment: '内容' })
    content: string;

    @Column({ comment: '父级评论id', default: 0 })
    parentId: number;

    @Column({ comment: '评论层级，1为一级评论，2为二级评论', default: 1 })
    level: number;


}
