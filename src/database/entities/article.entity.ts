import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  ArticleID,
  CarID,
  RegionID,
  UserID,
} from '../../common/types/entity-ids.type';
import { CurrencyEnum } from '../../modules/price/enum/currency.enum';
import { SellerEnum } from '../../modules/users/enum/seller.enum';
import { isActiveArticleEnum } from '../enums/is-active-article.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';
import { CarEntity } from './car.entity';
import { RegionEntity } from './region.entity';
import { ReportAfter3ChangesEntity } from './report-after-3-changes.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.ARTICLES)
export class ArticleEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: ArticleID;

  @Column('text', { nullable: true })
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column('text', { nullable: true })
  body?: string;

  @Column({ type: 'enum', enum: SellerEnum, nullable: true })
  sellerType?: SellerEnum;

  @Column({ type: 'int', default: 0 })
  cost: number;

  @Column('enum', { enum: CurrencyEnum, nullable: true })
  currency: CurrencyEnum;

  @Column('int', { default: 0 })
  costUAH: number;

  @Column({ type: 'int', default: 0 })
  currencyRate: number;

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({
    type: 'enum',
    enum: isActiveArticleEnum,
    default: isActiveArticleEnum.ACTIVE,
  })
  status: isActiveArticleEnum;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.articles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column()
  car_id: CarID;
  @ManyToOne(() => CarEntity, (entity) => entity.articles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;

  @Column()
  region_id: RegionID;
  @ManyToOne(() => RegionEntity, (entity) => entity.articles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'region_id' })
  region?: RegionEntity;

  @OneToOne(() => ReportAfter3ChangesEntity, (entity) => entity.article, {
    onDelete: 'CASCADE',
  })
  report_after_3_changes?: ArticleEntity;

  @Column({ default: 0 })
  changesCount: number;
}
