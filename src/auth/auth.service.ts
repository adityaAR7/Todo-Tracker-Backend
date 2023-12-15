import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserInterface } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
    private readonly jwtService:JwtService
  ) {}
  async loginAuth(email: string, password: string) {
    try {
      const user = await this.userModel.find({email:email});
      const flag = await bcrypt.compare(password,user[0]['password']);
      const result = user[0];
      if(flag){
        return {_id:user[0]._id,name:user[0].name,email:user[0].email,access_token:this.jwtService.sign({_id:user[0]._id,name:user[0].name,email:user[0].email})}
      }else{
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException('User not found');
    }
  }
  async googleAuth(profile: any,access_token:string) {
    try {
     const result = await this.userModel.find({email:profile.emails[0].value});
     if(result.length>0){
      return {_id:result[0]._id,name:result[0].name,email:result[0].email,access_token:access_token}
     } else {
       const user = new this.userModel({
        name:profile.displayName,
        email:profile.emails[0].value,
       })
       const result = await user.save();
       return {_id:result._id,name:result.name,email:result.email,access_token:access_token}
     }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
