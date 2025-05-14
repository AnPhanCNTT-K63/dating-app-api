import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/apis/user/entities/user.entity';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';

@Schema({
  timestamps: true,
})
export class Transaction {
  @Prop({
    type: String,
  })
  txnRef: string;

  @Prop({
    type: Number,
  })
  amount: string;

  @Prop({
    type: String,
  })
  bankCode: string;

  @Prop({
    type: String,
  })
  bankTranNo: string;

  @Prop({
    type: String,
  })
  cardType: string;

  @Prop({
    type: String,
  })
  orderInfo: string;

  @Prop({
    type: String,
  })
  payDate: string;

  @Prop({
    type: String,
  })
  responseCode: string;

  @Prop({
    type: String,
  })
  transactionNo: string;

  @Prop({
    type: String,
  })
  transactionStatus: string;

  @Prop({
    type: String,
  })
  secureHash: string;

  @Prop({
    type: String,
  })
  status: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    refClass: User,
  })
  createdBy: Types.ObjectId;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
TransactionSchema.plugin(autopopulateSoftDelete);
