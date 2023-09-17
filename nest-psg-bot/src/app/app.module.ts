import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from '../task/task.entity';

const sessions = new LocalSession({ database: 'session_db.json' });
@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [sessions.middleware()],
      token: 'YOUR TOKEN',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'YOUR HOST',
      port: 5432,
      database: 'YOUR DATABASE',
      username: 'postgres',
      password: 'YOUR PASSWORD',
      entities: [__dirname + '/../**/*.entity.js'],
      migrations: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
