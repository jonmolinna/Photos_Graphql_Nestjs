import { Args, Mutation, Resolver, Query, Subscription, ID } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { MessageType } from './type/message.type';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CreateMessageInput } from './input/message-create.input';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { ObjectId } from 'mongoose';
import { PubSub } from 'graphql-subscriptions';
import { ParseObjectIdPipe } from 'src/pipe/parse-object-id-pipe.pipe';

const pubSub = new PubSub();


@Resolver()
@UsePipes(ValidationPipe)
export class MessageResolver {
    constructor (private messageService: MessageService) {}

    @Mutation(() => MessageType)
    @UseGuards(JwtAuthGuard)
    async addMessage(@Args('input') body: CreateMessageInput, @CurrentUser() user: {email: string, sub: ObjectId}) {
        const message = this.messageService.create(body, user.sub);
        pubSub.publish('messageAdd', {messageAdd: message});
        return message;
    }

    @Query(() => [MessageType])
    @UseGuards(JwtAuthGuard)
    async getMessages(@Args('to', {type: () => ID}, ParseObjectIdPipe) to: ObjectId, @CurrentUser() user: {email: string, sub: string}) {
        return this.messageService.findMessages(user.sub, to);
    }

    @Subscription(() => MessageType)
    messageAdd() {
        return pubSub.asyncIterableIterator('messageAdd');
    }
}
