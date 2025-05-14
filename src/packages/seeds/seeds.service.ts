import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import { Types } from 'mongoose';
import { CategoryService } from 'src/apis/category/category.service';
import { InterestService } from 'src/apis/interest/interest.service';

@Injectable()
export class SeedsService implements OnModuleInit {
  public readonly logger = new Logger(SeedsService.name);
  constructor(
    private readonly categoryService: CategoryService,
    private readonly interestService: InterestService,
  ) {}

  async onModuleInit() {
    await this.seedCategories();
    await this.seedInterests();
    this.logger.debug('Seeding completed');
  }

  async seedCategories() {
    const categories = JSON.parse(
      fs.readFileSync(process.cwd() + '/public/data/categories.json', 'utf8'),
    );

    this.logger.debug('Seeding categories');

    for (const category of categories) {
      const { _id } = category;
      delete category.createdAt;
      delete category.updatedAt;

      const exists = await this.categoryService.categoryModel
        .findById(_id.$oid)
        .exec();

      if (!exists) {
        await this.categoryService.categoryModel.create({
          ...category,
          _id: new Types.ObjectId(_id.$oid),
        });
      }
    }
  }

  async seedInterests() {
    const interests = JSON.parse(
      fs.readFileSync(process.cwd() + '/public/data/interests.json', 'utf8'),
    );

    this.logger.debug('Seeding interests');

    for (const interest of interests) {
      const { _id } = interest;
      delete interest.createdAt;
      delete interest.updatedAt;

      const exists = await this.interestService.interestModel
        .findById(_id.$oid)
        .exec();

      if (!exists) {
        await this.interestService.interestModel.create({
          ...interest,
          _id: new Types.ObjectId(_id.$oid),
          category: new Types.ObjectId(interest.category),
        });
      }
    }
  }
}
