import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { notesDto } from 'src/DTO/Notes.dto';
import { log } from 'src/Interfaces/login.interface';
import { Note, NoteDocument } from 'src/Schemas/notes.schema';

import { UserService } from "../user/user.service";

@Injectable()
export class NotesService {

    private resp: log = {
        msg: ""
    };   

    constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>, private userService: UserService){}

    async getAllNotes(){
        const userkey = this.userService.getSessionNote();
        if(userkey != ""){
            const notes = await this.noteModel.find({userkey: userkey})
            return notes;
        }else{
            this.resp.msg = "error";
            return this.resp;
        }
        
    }

    async newNote(note: notesDto){
        const userkey = this.userService.getSessionNote();
        if(userkey != ""){
            note.userkey = userkey;
            const noteNew = new this.noteModel(note);
            await noteNew.save();
            this.resp.msg = "sucess";
            return this.resp;
        }else{
            this.resp.msg = "error";
            return this.resp;
        }
        
    }

    async oneNote(id: String){
        const note = await this.noteModel.findById(id);
        return note;
    }

    async deleteNote(id: String){
        await this.noteModel.findByIdAndDelete(id);
        this.resp.msg = "success";
        return this.resp;
    }

    async updateNote(id: String, note: notesDto){
        await this.noteModel.findByIdAndUpdate(id, {title: note.title, content: note.content});
        this.resp.msg = "success";
        return this.resp;
    }
}
