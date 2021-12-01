import { ApiOperation, ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Time } from "./common.entity";

@Entity({ name: 'user' })
export class User extends Time {
    @PrimaryGeneratedColumn({ comment: '用户ID' })
    id: number;

    @ApiProperty()
    @Column({ comment: '账号' })
    number: string;

    @ApiProperty()
    @Column({ comment: '密码' })
    password: string;

    @ApiProperty()
    @Column({ comment: '昵称' })
    nickname: string;

    @ApiPropertyOptional({ default: null })
    @Column({ comment: '头像', default: null })
    avatar: string;

    @ApiPropertyOptional({ default: null })
    @Column({ comment: '电话', default: null })
    mobile: string;

    @ApiPropertyOptional({default:3})
    @Column({ comment: '性别,1男2女3未知', type: 'integer', default: 3 })
    gender: number;

    @ApiPropertyOptional({ type: Date, default: null })
    @Column({ comment: '生日', type: 'date', default: null })
    birthday: Date;

    @Column({ default: null })
    type: string;
}
