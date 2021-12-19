import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Class } from "src/packages/classes/models/classes.schema";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    date: Date;

    @Column()
    content: string
    
    
    @ManyToOne(() => Class, classs => classs.id, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'classID' })
    @Column({ type: 'varchar' })
    classID: string

    public constructor(init?:Partial<Menu>) {
        Object.assign(this, init);
    }
}