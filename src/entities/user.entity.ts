import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Time } from "./common.entity";

@Entity({name:'user'})
export class User extends Time{
    @PrimaryGeneratedColumn({comment:'用户ID'})
    id:number;

    @Column({comment:'昵称'})
    nickname:string;

    @Column({comment:'头像'})
    avatar:string;

    @Column({comment:'电话'})
    mobile:string;

    @Column({comment:'性别,1男2女3未知',type:'integer',default:3})
    gender:number;

    @Column({comment:'生日',type:'date'})
    birthday:Date;

    @Column()
    type:string;
}
