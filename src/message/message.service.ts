import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schema/message.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateMessageInput } from './input/message-create.input';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

    async create(input: CreateMessageInput, from: ObjectId): Promise<MessageDocument> {
        const message = new this.messageModel({...input, from});
        return message.save();
    }

    async findMessages(from: string | ObjectId, to: string | ObjectId ): Promise<MessageDocument[]> {
        const messages = await this.messageModel.find({from: {$in: [from, to]}, to: {$in: [from, to]}}).sort({createdAt: -1})
        return messages;
    }
}
