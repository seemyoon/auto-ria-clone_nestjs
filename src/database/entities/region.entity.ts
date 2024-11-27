import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RegionID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';
import { ArticleEntity } from './article.entity';

@Entity(TableNameEnum.REGION)
export class RegionEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: RegionID;

  @Column('text')
  place: string;

  @OneToMany(() => ArticleEntity, (article) => article.region)
  articles: ArticleEntity[];
}
