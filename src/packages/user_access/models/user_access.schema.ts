import { Class } from "src/packages/classes/models/classes.schema";
import { School } from "src/packages/schools/models/schools.schema";
import { Student } from "src/packages/students/models/students.schema";
import { User } from "src/packages/users/models/users.schema";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserAccess {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    @Column({ type: 'varchar' })
    userId: string;

    @ManyToOne(() => Class, classs => classs.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'classId' })
    @Column({ type: 'varchar', nullable: true })
    classId: string;

    @ManyToOne(() => Class, childClass => childClass.parrent)
    childClass: Class;

    @ManyToOne(() => Student, student => student.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'studentId' })
    @Column({ type: 'varchar', nullable: true })
    studentId: string;

    @ManyToOne(() => School, school => school.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'schoolId' })
    @Column({ type: 'varchar', nullable: true })
    schoolId: string;

    @Column({ type: 'varchar' })
    status: string;

    @Column({ type: 'varchar' })
    roleName: string;
}