import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: false })
    address: string;
}