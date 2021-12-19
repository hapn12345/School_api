import { Column, Entity, PrimaryGeneratedColumn, OneToMany,JoinColumn } from "typeorm";
import { UserAccess } from "src/packages/user_access/models/user_access.schema";

@Entity()
export class Class {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    fee: number
    
    @Column()
    schedule: string

    @OneToMany(() => UserAccess, user => user.childClass)
    @JoinColumn()
    parrent: UserAccess[];
}