import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query, Request, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LoginDto, UserDto } from "./models/users.dto";
import { User } from "./models/users.schema";
import { UserService } from "./users.service";
import * as jwt from 'jsonwebtoken'
import { UserAccessService } from "../user_access/user_access.service";
import * as bcrypt from 'bcrypt';
import { Scopes } from "../../middlewares/authz";
import { scopes } from "../../constants/scopes";
import { StudentService } from "../students/students.service";
import { ClassService } from "../classes/classes.service";
import { In } from "typeorm";
import { SchoolService } from "../schools/schools.service";

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private userAccessService: UserAccessService,
        private studentsService: StudentService,
        private classService: ClassService,
        private schoolService: SchoolService
    ) { }


    @Get('')
    @UseGuards(AuthGuard('jwt'))
    async findAll(): Promise<User[]> {
        return await this.userService.findAll()
    }


    @Get('/me')
    @UseGuards(new Scopes([]))
    @UseGuards(AuthGuard('jwt'))
    async getAccess(
        @Request() { user }
    ) {

        const { studentIds, classIds, schoolIds, userId } = user;
        const [currentUser, students, classes, schools] = await Promise.all([
            this.userService.findOne({
                id: userId,
            }),
            this.studentsService.findMany({
                query: {
                    id: In(studentIds)
                }
            }),            
            this.classService.findMany({
                query: {
                    id: In(classIds)
                }
            }),
            this.schoolService.findMany({
                query: {
                    id: In(schoolIds)
                }
            }),
        ]);

        return {
            ...currentUser,
            classes,
            students,
            schools
        }
    }


    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param() { id }) {
        return await this.userService.findOne({
            id,
        })
    }

    @Post('')
    @UseGuards(new Scopes([[scopes.ADMIN_CREATE_USERS]]))
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    async create(@Body() user: UserDto) {

        const { roleName, classId, schoolId, studentId, status, password, ...createUserData } = user

        const hashPassword = await bcrypt.hash(password, 10);
        
        const newUser = await this.userService.create({ ...createUserData, password: hashPassword })

        await this.userAccessService.create({
            userId: newUser.id,
            classId: classId ? classId : null,
            schoolId: schoolId ? schoolId : null,
            studentId: studentId ? studentId : null,
            status,
            roleName,
        })

        return newUser
        // create user access for this user 
    }

    @Put(':id')
    @UseGuards(new Scopes([[scopes.TEACHER_UPDATE_USERS], [scopes.TEACHER_READ_USERS]]))
    @UseGuards(AuthGuard('jwt'))
    async update(@Body() userDto: User, @Param() id, @Request() { user }) {

        return await this.userService.update(userDto, id)
    }

    @Delete(':id')
    async delete(@Param() id) {
        return await this.userService.delete(id)
    }

    @Post('/login')
    @UseGuards(AuthGuard('local'))
    async login(
        @Request() { user }
    ) {
        try {
            const payload = {
                userId: user.id
            }
            const accessToken = await jwt.sign(payload, 'testsecretasjalsdkalskdlas', { expiresIn: '7d' })

            return {
                userId: user.id,
                accessToken,
            }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }


}