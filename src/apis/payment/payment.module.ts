import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './controllers/payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/entities/user.entity';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { VnpayService } from './vnpay.service';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, VnpayService, TransactionService],
  exports: [PaymentService, VnpayService, TransactionService],
})
export class PaymentModule {}
