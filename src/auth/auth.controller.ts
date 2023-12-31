import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { jwtAuthGuard } from './jwt.auth.guard';
import { GoogleAuthGuard } from './google.auth.guard';
import { AuthenticatedGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    @UseGuards(GoogleAuthGuard)
    @Get('google')
    googleLogin() {}
  
    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    googleLoginCallback(@Req() req: Request,@Res() res: Response) {
      res.redirect('https://todo-tracker-production.up.railway.app');
    }

}
