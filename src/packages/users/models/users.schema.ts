import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: false })
    userName: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({ type: 'varchar', nullable: false })
    firstName: string;

    @Column({ type: 'varchar', nullable: false })
    lastName: string;

    @Column({ type: 'varchar', nullable: false })
    phoneNumber: string;

    @Column({ type: 'varchar', nullable: false })
    email: string;
}