import { ListSubscriptionsQueryDto } from '../req/list-subscriptions.query.dto';
import { SubscriptionResDto } from './subscription.res.dto';

export class SubscriptionsListResDto extends ListSubscriptionsQueryDto {
  data: SubscriptionResDto[];
  total: number;
}
