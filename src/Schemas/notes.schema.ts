import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({required: true})
  title: String;

  @Prop()
  content: String;

  @Prop({required: true})
  userkey: String;
  
}

export const NoteSchema = SchemaFactory.createForClass(Note);