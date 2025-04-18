import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<any, mongoose.Types.ObjectId>
{
  transform(value: any): mongoose.Types.ObjectId {
    const validObjectId: boolean = mongoose.isObjectIdOrHexString(value);

    if (!validObjectId) {
      throw new BadRequestException('Invalid Object');
    }

    return value;
  }
}