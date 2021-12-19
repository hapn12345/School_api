import { roles } from "../constants/roles";
import { UserAccess } from "../packages/user_access/models/user_access.schema";

interface SchoolScope {
    schoolId: string,
    roleName: string,
    scopes: string[]
}

interface ClassScope {
    classId: string,
    roleName: string,
    scopes: string[]
}

interface StudentScope {
    studentId: string,
    roleName: string,
    scopes: string[]
}


interface GetRoleAccess {
    classIds: string[],
    studentIds: string[],
    schoolIds: string[],
    roleNames: string[],
    classScopes: ClassScope[],
    studentScopes: StudentScope[],
    schoolScopes: SchoolScope[],
}

export const getRoleAccess = (access: UserAccess[]): GetRoleAccess => {
    const classIds: string[] = []
    const studentIds: string[] = []
    const schoolIds: string[] = []
    const roleNames: string[] = []
    const classScopes: ClassScope[] = []
    const studentScopes: StudentScope[] = []
    const schoolScopes: SchoolScope[] = []

    if (!access || !access.length) {
        return {
            classIds: [],
            studentIds: [],
            schoolIds: [],
            roleNames: [],
            classScopes: [],
            studentScopes: [],
            schoolScopes: [],
        }
    }

    access.forEach(each => {

        if (each.studentId) {
            studentIds.push(each.studentId)

            studentScopes.push({
                studentId: each.studentId,
                roleName: each.roleName,
                scopes: roles[each.roleName]
            })
            roleNames.push(each.roleName)

            return
        }

        if (each.classId) {
            classIds.push(each.classId)

            classScopes.push({
                classId: each.classId,
                roleName: each.roleName,
                scopes: roles[each.roleName]
            })
            roleNames.push(each.roleName)

            return
        }


        if (each.schoolId) {
            schoolIds.push(each.schoolId)

            schoolScopes.push({
                schoolId: each.schoolId,
                roleName: each.roleName,
                scopes: roles[each.roleName]
            })
            roleNames.push(each.roleName)

            return
        }

    })


    return {
        classIds,
        studentIds,
        schoolIds,
        roleNames,
        classScopes,
        studentScopes,
        schoolScopes,
    }
}