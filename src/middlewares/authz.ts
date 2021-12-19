import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { checkScopes } from "../helpers/check";
import { getRoleAccess } from "../helpers/get";

@Injectable()

export class Scopes implements CanActivate {
    constructor(
        private readonly requiredScopes: string[][],
    ) { }

    async canActivate(context: ExecutionContext) {
        try {
            console.log("huhuhuhuhuhu");
            
            const request = context.switchToHttp().getRequest();

            const { user } = request

            if (!user) {
                return false
            }

            const { roleAccess } = user

            if (!roleAccess || !roleAccess.length) {
                return false
            }

            const {
                classScopes,
                studentScopes,
                schoolScopes,
                classIds,
                schoolIds,
                studentIds,
                roleNames,
            } = getRoleAccess(roleAccess)

            if (!this.requiredScopes || !this.requiredScopes.length) {
                request.user = {
                    userId: user.userId,
                    classIds,
                    schoolIds,
                    studentIds,
                    roleNames,
                }

                return true
            }

            const validRoleNames = []
            const validclassScopes = checkScopes(this.requiredScopes, classScopes)
            const validStudentScopes = checkScopes(this.requiredScopes, studentScopes)
            const validSchoolScopes = checkScopes(this.requiredScopes, schoolScopes)

            const validStudentIds = validStudentScopes.map(each => {
                validRoleNames.push(each.roleName)
                return each.studentId
            })

            const validClassIds = validclassScopes.map(each => {
                validRoleNames.push(each.roleName)
                return each.classId
            })

            const validSchoolIds = validSchoolScopes.map(each => {
                validRoleNames.push(each.roleName)
                return each.schoolId
            })

            const isValidScope = (validSchoolScopes && validSchoolScopes.length) ||
                (validclassScopes && validclassScopes.length) ||
                (validStudentScopes && validStudentScopes.length) ||
                roleNames.includes('ADMIN')
            if (!isValidScope) {
                return false
            }

            request.user = {
                userId: user.userId,
                classIds: validClassIds,
                schoolIds: validSchoolIds,
                studentIds: validStudentIds,
                roleNames: validRoleNames,
            }

            return true
        } catch (error) {
            return false
        }
    }
}