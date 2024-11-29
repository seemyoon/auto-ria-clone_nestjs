import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async findAll(
    query: ListUsersQueryDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('user');

    if (query.search) {
      qb.andWhere('user.name ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findById(userId: UserID): Promise<UserEntity> {
    const qb = this.createQueryBuilder('user')
      .andWhere('user.id = :userId', { userId })
      .addSelect('user.password');

    return await qb.getOne();
  }
}
