import { Schema } from 'mongoose';

export const TodoSchema = new Schema({
  title: { type: String, required: true},
  status:{type:String,default:'pending'},
  uid: {type:String,required:true}
});

export interface TodoInterface{
  title:String,
  status:String,
  uid:String
}

