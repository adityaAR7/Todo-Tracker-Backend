import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, AuthModule, TodoModule,MongooseModule.forRoot('mongodb+srv://aditya:yPHbeHpNqg4yqj1q@cluster0.zudjwly.mongodb.net/?retryWrites=true&w=majority'),ConfigModule.forRoot({})],
})
export class AppModule {}
