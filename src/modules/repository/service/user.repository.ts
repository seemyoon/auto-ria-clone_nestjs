import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

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
    const qb = this.createQueryBuilder('article');
    //todo all users via qb
    return await qb.getManyAndCount();
  }
}
