import { scopes } from "./scopes";

export const roles = {
    ADMIN: [
        scopes.ADMIN_CREATE_USERS,
    ],
    PARENTS: [
        scopes.PER_READ_USERS,
        scopes.PER_UPDATE_USERS,
        scopes.PARENT_READ_USERS,
        scopes.PER_READ_FEES,
    ],
    TEACHERS: [
        scopes.PER_READ_USERS,
        scopes.PER_UPDATE_USERS,
        scopes.TEACHER_READ_USERS,
        scopes.TEACHER_UPDATE_USERS,
        scopes.TEACHER_READ_FEES,
    ]
}