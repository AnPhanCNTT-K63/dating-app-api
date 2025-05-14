import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';
import { MultipleLanguage } from 'src/decorators/multiple-language.decorator';
import { MultipleLanguageType } from 'src/utils/multiple-languages/multiple-language.type';

@Schema({
  timestamps: true,
})
export class Interest {
  @Prop({
    type: MultipleLanguageType,
    required: true,
  })
  @MultipleLanguage()
  name: MultipleLanguageType;

  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
  })
  category: Types.ObjectId;
}

export const InterestSchema = SchemaFactory.createForClass(Interest);

InterestSchema.plugin(autopopulateSoftDelete);
