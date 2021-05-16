import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { notesDto } from 'src/DTO/Notes.dto';
import { log } from 'src/Interfaces/login.interface';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {

    constructor(private noteService: NotesService){}

    @Get()
    getAllNotes(){
        return this.noteService.getAllNotes();
    }

    @Get('/edit/:id')
    getSingleNote(@Param('id') id: String){
        return this.noteService.oneNote(id);
    }

    @Post('/create')
    createNote(@Body() note: notesDto): Promise<log>{
        return this.noteService.newNote(note);
    }

    @Put('/edit/:id')
    updateNote(@Param('id') id: String, @Body() note: notesDto){
        return this.noteService.updateNote(id, note);
    }

    @Delete('/delete/:id')
    deleteNote(@Param('id') id: String){
        return this.noteService.deleteNote(id);
    }
}
