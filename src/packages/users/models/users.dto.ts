import { IsString, IsEnum, IsOptional } from 'class-validator'

export class LoginDto {
    readonly userName: string;
    readonly password: string;
}

export enum RoleNames {
    TEACHERS = 'TEACHERS',
    PARENTS = 'PARENTS',
}

export enum Status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export class UserDto {
    @IsEnum(RoleNames)
    readonly roleName: string;

    @IsString()
    @IsOptional()
    readonly classId?: string;

    @IsString()
    @IsOptional()
    readonly studentId?: string;

    @IsString()
    @IsOptional()
    readonly schoolId?: string;

    @IsEnum(Status)
    readonly status: string;

    @IsString()
    readonly userName: string;

    @IsString()
    readonly password: string;

    @IsString()
    @IsOptional()
    readonly firstName?: string;

    @IsString()
    @IsOptional()
    readonly lastName?: string;

    @IsString()
    @IsOptional()
    readonly phoneNumber?: string;

    @IsString()
    @IsOptional()
    readonly email?: string;
}