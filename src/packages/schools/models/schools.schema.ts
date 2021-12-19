import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class School {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string

    @Column()
    info: string
}
