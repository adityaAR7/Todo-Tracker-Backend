import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://todo-tracker-production.up.railway.app',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  // app.use(
  //   session({
  //     secret: process.env.SECRET,
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       //for storing cookie in the client side
  //       maxAge: 24 * 60 * 60 * 1000,
  //       secure: true,
  //       httpOnly:false,
  //       sameSite:'none'
  //     },
  //   }),
  // );
  app.use(
    cookieSession({
      name: "session",
      keys: ['This is my secret'],
      maxAge: 24 * 60 * 60 * 1000,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
