import { CategoryModule } from 'src/apis/category/category.module';
import { SeedsService } from './seeds.service';
import { Module } from '@nestjs/common';
import { InterestModule } from 'src/apis/interest/interest.module';

@Module({
  imports: [CategoryModule, InterestModule],
  controllers: [],
  providers: [SeedsService],
  exports: [SeedsService],
})
export class SeedsModule {}
