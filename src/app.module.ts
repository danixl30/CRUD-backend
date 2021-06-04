import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { NotesModule } from './notes/notes.module';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UserModule, MongooseModule.forRoot('mongodb://localhost/CrudTest')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
