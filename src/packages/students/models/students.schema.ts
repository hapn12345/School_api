import { Class } from "src/packages/classes/models/classes.schema";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToOne(() => Class, classs => classs.id, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'classID' })
    @Column({ type: 'varchar' })
    classID: string
}