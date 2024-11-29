import { ApiProperty } from '@nestjs/swagger';

import { SubscribeID, UserID } from '../../../../common/types/entity-ids.type';

export class SubscriptionResDto {
  @ApiProperty({ type: String })
  id: SubscribeID;
  user_id: UserID;
}
