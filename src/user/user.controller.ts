import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/DTO/User.dto';
import { log } from 'src/Interfaces/login.interface';

import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    constructor(private loginFunc: UserService){}

    @Get('/session')
    getSession(): Promise<log>{
        return this.loginFunc.getSession();
    }

    @Post('/register')
    createUser(@Body() userRes: UserDto): Promise<log>{
        return this.loginFunc.createUser(userRes);
    }

    @Post('/authenticate')
    authenUser(@Body() userLog: UserDto): Promise<log>{
        return this.loginFunc.logUser(userLog);
    }

    @Get('/logout')
    logoutUser(){
        return this.loginFunc.destroySession();
    }

}
