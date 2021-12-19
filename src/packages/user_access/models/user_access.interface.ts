export interface UserAccessInterface {
    userId?: string;
    classId?: string;
    schoolId?: string;
    studentId?: string;
    status: string;
    roleName: string;
}

export interface FindManyQuery {
    userId?: string;
    classId?: string;
    schoolId?: string;
    studentId?: string;
    status?: string;
    roleName?: string;
}

export interface FindManyUserAccessInteface {
    query: FindManyQuery
}
