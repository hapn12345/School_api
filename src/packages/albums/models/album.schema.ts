import { Optional } from "@nestjs/common";
import { Class } from "../../classes/models/classes.schema";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar'})
    name: string;

    @Column({ type: 'simple-array', nullable: true })
    images: string[];

    @OneToOne(() => Class, classs => classs.id, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'classID' })
    @Column({ type: 'varchar', nullable: true })
    classID: string
}