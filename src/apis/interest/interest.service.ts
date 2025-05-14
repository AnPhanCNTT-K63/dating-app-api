import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interest } from './interest.entity';
import { Model } from 'mongoose';

@Injectable()
export class InterestService {
  constructor(
    @InjectModel(Interest.name)
    public readonly interestModel: Model<Interest>,
  ) {}

  async getAll() {
    return this.interestModel.find().populate('category');
  }
}
