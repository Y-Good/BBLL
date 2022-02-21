import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Time } from "./common.entity";
import { Video } from "./video.entity";
import { Comment } from "./comment.entity";

@Entity('user')
export class User extends Time {
    @PrimaryGeneratedColumn({ comment: '用户ID' })
    id: number;

    @Column({ comment: '账号' })
    number: string;

    @Column({ comment: '密码', select: false })
    password: string;

    @Column({ comment: '昵称' })
    nickname: string;

    @Column({ comment: '头像', default: null })
    avatar: string;

    @Column({ comment: '电话', default: null })
    mobile: string;

    @Column({ comment: '性别,1男2女3未知', type: 'integer', default: 3 })
    gender: number;

    @Column({ comment: '生日', type: 'date', default: null })
    birthday: Date;

    @Column({ comment: '0超级管理员1普通', default: 1 })
    type: number;

    @ManyToMany((type) => Video, (video) => video.users)
    @JoinTable({ name: 'thumb_up' })
    videos: Video[]

    @OneToMany((type) => Comment, (comment) => comment.user)
    comments: Comment[]

    @ManyToMany((type) => Video, (video) => video.historyUsers)
    @JoinTable({ name: 'history' })
    historyVideos: Video[]


}
