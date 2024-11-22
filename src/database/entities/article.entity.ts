import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ArticleID, CarID, UserID } from '../../common/types/entity-ids.type';
import { SellerEnum } from '../../modules/users/enum/seller.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';
import { CarEntity } from './car.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.CAR_ARTICLES)
export class ArticleEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: ArticleID;

  @Column('text')
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  body?: string;

  @Column('int', { nullable: true })
  numberOfViews?: number;

  @Column({ type: 'enum', enum: SellerEnum })
  sellerType?: SellerEnum;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  car_id: CarID;
  @ManyToOne(() => CarEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;
}
