import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ArticleID } from '../../common/types/entity-ids.type';
import { SellerEnum } from '../../modules/users/enum/seller.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';

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

  @Column({ type: 'enum', enum: SellerEnum })
  sellerType: SellerEnum;

  @Column('int', { nullable: true })
  numberOfViews?: number;
}
