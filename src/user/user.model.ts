import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email:{ type: String, required:true, unique:true},
  password:{type:String},
  photo:{type:String},
  profile_id:{type:String}
});

export interface UserInterface{
    name:string,
    email:string,
    password:string,
    photo:String,
    profile_id:String

}