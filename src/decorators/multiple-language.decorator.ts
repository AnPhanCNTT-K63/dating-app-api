import { TypeMetadataMultipleLanguageStorage } from 'src/utils/multiple-languages/type-metadata.storage';

export function MultipleLanguage(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    TypeMetadataMultipleLanguageStorage.addMultipleLanguageMetadata({
      target: target.constructor,
      propertyKey: propertyKey as string,
    });
  };
}
