import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from './input/user-create.input';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(body: CreateUserInput): Promise<UserDocument> {
        const hash = await bcrypt.hash(body.password, 10);
        const user = new this.userModel({...body, password: hash});
        return user.save();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({ email })
    }

    async findAll(id?: String | ObjectId): Promise<UserDocument[] | []> {
        const users = (await this.userModel.find().then(users => (!id ? users : users.filter(user => user.id !== id)))).sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
        return users;
    }

    async findById(id: String | ObjectId): Promise<UserDocument | null> {
        return await this.userModel.findById(id);
    }
}
