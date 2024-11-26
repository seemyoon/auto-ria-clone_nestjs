import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserID } from '../../common/types/entity-ids.type';
import { BannedEnum } from '../../modules/users/enum/banned.enum';
import { SellerEnum } from '../../modules/users/enum/seller.enum';
import { UserEnum } from '../../modules/users/enum/users.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';
import { ArticleEntity } from './article.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { SubscribeEntity } from './subscribe.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  name: string;

  @Column('text', { select: false })
  password: string;

  @Column({ type: 'enum', enum: SellerEnum, nullable: true })
  sellerType?: SellerEnum;

  @Column({ type: 'enum', enum: BannedEnum, default: BannedEnum.NOT_BANNED })
  isBanned: BannedEnum;

  @Column('text', { nullable: true })
  image?: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @Column({ type: 'enum', enum: UserEnum })
  role: UserEnum;

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToOne(() => SubscribeEntity, (entity) => entity.user)
  subscribe?: SubscribeEntity;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];
}
