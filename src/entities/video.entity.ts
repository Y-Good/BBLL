import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Comment } from './comment.entity';
import { Time } from './common.entity'
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity('video')
export class Video extends Time {

    @PrimaryGeneratedColumn({ comment: '主键，自增' })
    id: number;

    @Column({ comment: '视频标题' })
    title: string;

    @Column({ comment: '视频分类' })
    category: number;

    @Column({ comment: '观看次数', default: 0 })
    view: number;

    @Column({ comment: '点赞数', default: 0 })
    thumbUp: number;

    @Column({ comment: '收藏数', default: 0 })
    collections: number;

    @Column({ comment: '转发数', default: 0 })
    share: number;

    @Column({ comment: '视频url地址', default: null })
    url: string;

    @Column({ comment: "视频封面", default: null })
    cover: string;

    ///视频
    @ManyToOne(() => User)
    user: User;

    ///点赞
    @ManyToMany(() => User, (user) => user.thumbUp)
    users: User[];

    @OneToMany(() => Comment, comment => comment.video)
    comments: Comment[];

    @ManyToMany(() => Tag, (tag) => tag.videos)
    @JoinTable({ name: 'video_tag' })
    tags: Tag[];

    @ManyToMany((type) => User, (user) => user.historyVideos)
    historyUsers: User[]
}
