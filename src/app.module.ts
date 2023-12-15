import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, AuthModule, TodoModule,MongooseModule.forRoot('mongodb://mongo:F3fFg-bCEbgAeC4dhfa3f4eagAG1DdcC@monorail.proxy.rlwy.net:44247'),ConfigModule.forRoot({})],
})
export class AppModule {}
