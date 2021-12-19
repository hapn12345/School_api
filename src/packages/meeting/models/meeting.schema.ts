import { Column, Entity,ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToOne } from "typeorm";
import {Class} from '../../classes/models/classes.schema'
import {User} from '../../users/models/users.schema'

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    subject: string

    @Column()
    description: string

    @Column()
    date: Date


    @OneToOne(() => User)
    @JoinColumn()
    teacher: User;
    

    @OneToOne(() => Class)
    @JoinColumn()
    class: Class;
}
