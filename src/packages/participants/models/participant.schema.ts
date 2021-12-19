import { Activity } from "src/packages/activities/models/activities.schema";
import { Class } from "src/packages/classes/models/classes.schema";
import { Student } from "src/packages/students/models/students.schema";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => Activity, activity => activity.id, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'activityID' })
    @Column({ type: 'varchar' })
    activityID: string

    @ManyToOne(() => Student, student => student.id, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'studentID' })
    @Column({ type: 'varchar' })
    studentID: string

    @ManyToOne(() => Class, classs => classs.id, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'classID' })
    @Column({ type: 'varchar' })
    classID: string
}