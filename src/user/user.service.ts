import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { request } from 'express';
import { sha256 } from 'js-sha256';
import { Model } from 'mongoose';
import { UserDto } from 'src/DTO/User.dto';
import { log } from 'src/Interfaces/login.interface';
import { User, UserDocument } from 'src/Schemas/user.schema';

@Injectable()
export class UserService {

    private session: String;
    private resp: log = {
        msg: ""
    };   

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async getSession(){
        //this.resp.msg = "";
        if(this.session !== undefined){
            //var resp: log;
            this.resp.msg = this.session;
            console.log(this.resp);
            return this.resp;
        }else{
            //var resp: log;
            this.resp.msg = '';
            console.log(this.resp);
            return this.resp;
        }
    }

    getSessionNote(){
        return this.session;
    }

    async createUser(userPost: UserDto){
        if(userPost.password == userPost.confirm_password){
            const preventUser = await this.userModel.findOne({username: userPost.username});
            if(!preventUser){
                let hashPass = userPost.password.toString();
                userPost.password = sha256(hashPass)
                const regis = new this.userModel(userPost);
                await regis.save();
                //var resp: log;
                this.resp.msg = 'success';
                return this.resp;
            }else{
                //var resp: log;
                this.resp.msg = 'The user already exist';
                return this.resp;
            }
        }else{
            //var resp: log;
            this.resp.msg = 'The passwords do not match';
            return this.resp;
        }
    }

    async logUser(userPost: UserDto){
        const preventUser = await this.userModel.findOne({username: userPost.username});
        if(preventUser){
            let passHash = sha256(userPost.password.toString())
            if(preventUser.password == passHash){
                //request.session.save = preventUser.username;
                this.session = preventUser.username;
                //var resp: log;
                this.resp.msg = 'success';
                return this.resp;
            }else{
                //var resp: log;
                this.resp.msg = 'The password do not match';
                return this.resp;
            }
        }else{
            //var resp: log;
            this.resp.msg = 'The user does not exist';
            return this.resp;
        }
    }

    destroySession(){
        this.session = '';
        this.resp.msg = 'success';
        return this.resp;
    }
}
