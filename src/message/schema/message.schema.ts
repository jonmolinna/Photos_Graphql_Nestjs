import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/schemas/user.schema";

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
    @Prop({type: String})
    message: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    from: User

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    to: User

    @Prop({default: Date.now})
    createdAt: Date
}

export const MessageSchema = SchemaFactory.createForClass(Message);