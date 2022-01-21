import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Time } from './common.entity'
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity({ name: 'comment' })
export class Comment extends Time {

    @PrimaryGeneratedColumn({ comment: '主键，自增' })
    id: number;

    @Column({ comment: '内容' })
    content: string;

    @Column({ comment: '父级评论id', default: 0 })
    parentId: number;

    @Column({ comment: '评论层级，1为一级评论，2为二级评论', default: 1 })
    level: number;

    @ManyToOne(() => Video, video => video.comments)
    @JoinColumn()
    video: Video

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn()
    user: User
}
