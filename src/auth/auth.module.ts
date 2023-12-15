import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.startegy';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: "This is my secret",
      signOptions: { expiresIn: '2d' },
    }),
    PassportModule.register({session:true})
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,LocalStrategy,GoogleStrategy,SessionSerializer],
})
export class AuthModule {}
