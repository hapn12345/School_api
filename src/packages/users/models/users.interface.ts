export interface FindOneUserQuery {
    id?: string
    userName?: string
    firstName?: string
    lastName?: string
}

export interface CreateUserInteface {
    userName: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
}