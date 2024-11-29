import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserID } from '../../../common/types/entity-ids.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserEnum } from '../../users/enum/users.enum';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async findUser(userId: UserID): Promise<UserEntity> {
    const qb = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.subscribe', 'subscribe')
      .where('user.id = :userId', { userId });

    return await qb.getOne();
  }

  public async findAll(
    query: ListUsersQueryDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('user').leftJoinAndSelect(
      'user.subscribe',
      'subscribe',
    );

    if (query.search) {
      qb.andWhere('user.name ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findAllSellers(
    query: ListUsersQueryDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.subscribe', 'subscribe')
      .where('user.role = :sellerRole', { sellerRole: UserEnum.SELLER })
      .orWhere('user.role = :dealershipSellerRole', {
        dealershipSellerRole: UserEnum.DEALERSHIP_SELLER,
      });

    if (query.search) {
      qb.andWhere('user.name ILIKE :search', { search: `%${query.search}%` });
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findById(userId: UserID): Promise<UserEntity> {
    const qb = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.subscribe', 'subscribe')
      .leftJoinAndSelect('user.articles', 'articles')
      .andWhere('user.id = :userId', { userId })
      .addSelect('user.password');

    return await qb.getOne();
  }
}
