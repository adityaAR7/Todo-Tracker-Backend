import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { PassportSerializer } from "@nestjs/passport"
import { Model } from "mongoose";
import { UserInterface } from "src/user/user.model";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(@InjectModel('User') private readonly userModel:Model<UserInterface>){
        super();
    }
  serializeUser(user: any, done: any): any {
    done(null, user)
  }
  async deserializeUser(
    user: any,
    done: any
  ): Promise<any> {
    try {
      done(null,user);
      } catch (error) {
        console.log(error);
      }
  }
}