import { IsString } from 'class-validator'

export class MessageDto {
    @IsString()
    readonly content: string;

    @IsString()
    readonly target: string;


    @IsString()
    readonly type: string;
}