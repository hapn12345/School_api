import { User } from "src/packages/users/models/users.schema";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sender' })
    @Column({ type: 'varchar', nullable: false })
    sender: string;

    @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'target' })
    @Column({ type: 'varchar', nullable: false })
    target: string

    @Column({ type: 'varchar' })
    content: string

    @Column({ type: 'varchar' })
    type: string

    @CreateDateColumn({ type: 'datetime' })
    createdAt: string
}