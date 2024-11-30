import { IsEnum, IsNotEmpty } from 'class-validator';

import { isActiveArticleEnum } from '../../../../database/enums/is-active-article.enum';

export class ActiveOrInactiveReqUserDto {
  @IsNotEmpty()
  @IsEnum(isActiveArticleEnum)
  readonly isActiveArticleEnum: isActiveArticleEnum;
}
