import { Body, Controller, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Response } from 'express';
import { AuthenticatedGuard } from 'src/auth/auth.guard';

@Controller('todo')
export class TodoController {
    constructor(private todoService:TodoService){}
   
    @Get('fetchAll/:uid')
    async fetchAll(@Param('uid') uid:string,@Res() res:Response){
        const result = await this.todoService.fetchAllService(uid);
        res.status(200).json({result:result});
    }
    

    @Post('/addTodo/:uid')
    async addTodo(@Param('uid') uid:string,@Body('title') title:string,@Res() res:Response){
       const result = await this.todoService.addTodoService(title,uid);
       res.status(200).json({result:[result]});
    }


    @Put('updateTodo/:id')
    async updateTodo(@Param('id') id:string,@Res() res:Response){
        await this.todoService.updateTodoService(id);
        res.status(200).json({});
    }
}
