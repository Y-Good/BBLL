import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.entity";

@Entity({ name: 'tag' })
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tag: string;

    @ManyToMany(()=>Video,(video)=>video.tags)
    videos:Video[];
}