import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('login/success')
  loginSuccess(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    return res.status(200).json({ user: req.user });
  }
  @Post('signin')
  async signIn(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = await this.userService.signInService(name, email, password);
    res.status(200).json({ success: true });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() req: Request, @Res() res: Response) {
    res.status(200).json({ user: req.user });
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout(function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect(process.env.CLIENT_URL);
    });
  }
}
