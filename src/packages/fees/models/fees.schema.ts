import { Class } from "src/packages/classes/models/classes.schema";
import { Student } from "src/packages/students/models/students.schema";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Fee {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    fee: number;

    @Column()
    month: string

    @Column()
    status: string

    @ManyToOne(() => Student, student => student.id, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'studentID' })
    @Column({ type: 'varchar', nullable: true })
    studentID: string

    @ManyToOne(() => Class, classs => classs.id, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'classID' })
    @Column({ type: 'varchar', nullable: true })
    classID: string
}
export class FeePayload {
    month: string
    studentID: string
}