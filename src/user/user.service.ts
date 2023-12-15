import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<UserInterface>){}
    async signInService(name:string,email:string,password:string){
        try {
            const hash = await bcrypt.hash(password, Number(process.env.SALTROUND));
            const user = new this.userModel({
                name,
                email,
                password:hash
            })
            await user.save();
        } catch (error) {
            console.log(error);
            throw new ForbiddenException('Email already registered,try again with different email');
        }

    }

}
