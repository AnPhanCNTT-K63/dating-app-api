import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './controllers/interest.controller';
import { Interest, InterestSchema } from './interest.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Interest.name,
        schema: InterestSchema,
      },
    ]),
  ],
  controllers: [InterestController],
  providers: [InterestService],
  exports: [InterestService],
})
export class InterestModule {}
