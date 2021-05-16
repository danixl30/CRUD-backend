import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({required: true})
  username: String;

  @Prop({required: true})
  password: String;
  
}

export const UserSchema = SchemaFactory.createForClass(User);