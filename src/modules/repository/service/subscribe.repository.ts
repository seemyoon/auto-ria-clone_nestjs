import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { SubscribeEntity } from '../../../database/entities/subscribe.entity';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';

@Injectable()
export class SubscribeRepository extends Repository<SubscribeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SubscribeEntity, dataSource.manager);
  }

  public async findAll(
    query: ListUsersQueryDto,
  ): Promise<[SubscribeEntity[], number]> {
    const qb = this.createQueryBuilder('subscribe');
    qb.leftJoinAndSelect('subscribe.user', 'user');

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
