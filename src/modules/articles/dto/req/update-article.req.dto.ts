import { PickType } from '@nestjs/swagger';

import { BaseArticleReqDto } from './article.req.dto';

export class UpdateArticleReqDto extends PickType(BaseArticleReqDto, [
  'title',
  'description',
  'body',
  'model',
  'brand',
  'cost',
  'region',
]) {}
