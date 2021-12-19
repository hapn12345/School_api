import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class News {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    content: string;

    @Column()
    description: string

    @Column()
    thumbnail: string

   @Column()
    releaseDate: Date
}