import { Student } from "src/packages/students/models/students.schema";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentHealth {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    weight: string;

    @Column()
    height: string;

    @Column()
    note: string;

    @ManyToOne(() => Student, student => student.id, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'studentID' })
    @Column({ type: 'varchar' })
    studentID: string;

    @Column()
    checkedAt: string;
}