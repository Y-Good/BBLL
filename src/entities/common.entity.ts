import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Time {
    @CreateDateColumn({select:false})
    createDate: Date;

    @UpdateDateColumn({select:false})
    updateDate: Date;
}