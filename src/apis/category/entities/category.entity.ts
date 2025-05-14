import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { CategoryType } from '../constants';
import autopopulateSoftDelete from 'src/utils/mongoose-plugins/autopopulate-soft-delete';
import { MultipleLanguage } from 'src/decorators/multiple-language.decorator';
import { MultipleLanguageType } from 'src/utils/multiple-languages/multiple-language.type';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({
    type: MultipleLanguageType,
    required: true,
  })
  @MultipleLanguage()
  name: MultipleLanguageType;

  @Prop({
    type: Number,
    default: 0,
  })
  position: number;

  @Prop({ type: Types.ObjectId, ref: 'File', required: false })
  image: Types.ObjectId;

  @Prop({
    type: String,
    enum: CategoryType,
  })
  type: CategoryType;

  @Prop({
    type: String,
  })
  shortDescription: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
  })
  parent: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.plugin(autopopulateSoftDelete);
