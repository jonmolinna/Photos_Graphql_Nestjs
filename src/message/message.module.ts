import { Module } from '@nestjs/common';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/message.schema';

@Module({
  providers: [MessageResolver, MessageService],
  imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema}])],
})
export class MessageModule {}
