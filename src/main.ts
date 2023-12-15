import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://todo-tracker-production.up.railway.app',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  });
  app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        //for storing cookie in the client side
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
