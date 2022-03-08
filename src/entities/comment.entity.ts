import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Time } from './base.entity'
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('comment')
export class Comment {

    @PrimaryGeneratedColumn({ comment: '主键，自增' })
    id: number;

    @Column({ comment: '内容' })
    content: string;

    @Column({ comment: '父级评论id', default: null })
    parentId: number;

    @Column({ comment: '评论层级，1为一级评论，2为二级评论', default: 1 })
    level: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    ///评论那条视频
    @ManyToOne(() => Video, video => video.comments)
    @JoinColumn()
    video: Video

    ///那个评论
    @ManyToOne(() => User, user => user.comments)
    @JoinColumn()
    user: User

    ///用户点赞评论
    @ManyToMany(() => User, (user) => user.thumbUpComment)
    users: User[];
}
