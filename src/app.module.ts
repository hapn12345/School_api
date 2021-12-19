import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './middlewares/auth.module';
import { ActivityModule } from './packages/activities/activities.module';
import { ClassModule } from './packages/classes/classes.module';
import { SchoolModule } from './packages/schools/schools.module';
import { StudentModule } from './packages/students/students.module';
import { UserModule } from './packages/users/users.module';
import { UserAccessModule } from './packages/user_access/user_access.module';
import { MessageModule } from './packages/messages/messages.module';
import { SocketModule } from './packages/socket/socket.module';
import { CloudinaryModule } from './packages/images/images.module';
import { ParticipantModule } from './packages/participants/participants.module';
import { AlbumModule } from './packages/albums/albums.module';
import { FeeModule } from './packages/fees/fees.module';
import { StudentHealthModule } from './packages/student_health/student_health.module';
import { LeaveDayModule } from './packages/leave_days/leave_module';
import { FirebaseModule } from './packages/firebase/firebase.module';
import { NewsModule } from './packages/news/news.module';
import { MenuModule } from './packages/menu/menu.module';
import { MeetingModule } from './packages/meeting/meeting.module';



@Module({
  imports: [
    SocketModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'benpro123',
      database: 'schoolkids',
      entities: ['/dist/**/*.schema{.ts, .js}'],
      synchronize: true,
      autoLoadEntities: true,
      logger: 'debug',
    }),
    UserModule,
    SchoolModule,
    ActivityModule,
    ClassModule,
    StudentModule,
    AuthModule,
    UserAccessModule,
    MessageModule,
    CloudinaryModule,
    ParticipantModule,
    AlbumModule,
    FeeModule,
    StudentHealthModule,
    LeaveDayModule,
    FirebaseModule,
    NewsModule,
    MenuModule,
    MeetingModule

  ],
})
export class AppModule { }