import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Time {
    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;
}