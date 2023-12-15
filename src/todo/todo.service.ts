import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoInterface } from './todo.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<TodoInterface>,
  ) {}
  async fetchAllService(id: string) {
    try {
      const result = await this.todoModel.find({ uid: id });
      return result;
    } catch (error) {
        throw new ForbiddenException('Internal Server Error');
    }
  }
  async addTodoService(title:string,uid:string){
    try {
        const todo = new this.todoModel({
            title:title,
            uid:uid
        })
        const result = await todo.save();
        return result;
    } catch (error) {
        throw new ForbiddenException('Todo Exist');
    }
  }
  async updateTodoService(id:string){
    try {
        await this.todoModel.updateOne({_id:id},{status:'completed'})
    } catch (error) {
        throw new ForbiddenException('Todo Not Present');
    }
  }
}
