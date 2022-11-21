import { ForbiddenException, Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import {PutUserDto} from "./dto";

@Injectable()
export class UserService {
  constructor(private mongo: MongodbService) {}

  async updateUser(id, body) {
    await this.mongo.user.updateOne({ _id: id }, {
      $set: {
        ...(body.image && { image: body.image }),
        ...(body.gender && { gender: body.gender }),
        ...(body.firstName && { firstName: body.firstName }),
        ...(body.secondName && { secondName: body.secondName })
      },
      $unset: {
        ...(body.image === '' && { image: '' }),
        ...(body.gender === '' && { gender: '' }),
        ...(body.firstName === '' && { firstName: '' }),
        ...(body.secondName === '' && { secondName: '' })
      }
    });
  }

  getAllUsers() {
    return this.mongo.user.find().select('-hash -__v');
  }
  async getIdUser(id: string) {
    try {
      return await this.mongo.user.findById(id).select('-hash -__v');
    } catch (err) {
      throw new ForbiddenException('User not found');
    }
  }
  async updateMe(id: string, body: PutUserDto) {
    await this.updateUser(id, body);
  }
  async updateUserId (id: string, body: PutUserDto) {
    const user = this.mongo.user.findOne({ _id: id });
    if (user) {
      await this.updateUser(id, body);
    } else {
      throw new ForbiddenException('Пользователь не найден');
    }
  }
}
