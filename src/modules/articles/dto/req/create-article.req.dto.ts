import { PickType } from '@nestjs/swagger';

import { BaseArticleReqDto } from './article.req.dto';

export class CreateArticleReqDto extends PickType(BaseArticleReqDto, [
  'title',
  'description',
  'body',
]) {}
