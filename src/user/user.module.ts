import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../Schemas/user.schema';
import { Note, NoteSchema } from 'src/Schemas/notes.schema';
import { NotesController } from 'src/notes/notes.controller';
import { NotesService } from 'src/notes/notes.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}, {name: Note.name, schema: NoteSchema}])],
  controllers: [UserController, NotesController],
  providers: [UserService, NotesService]
})
export class UserModule {}
