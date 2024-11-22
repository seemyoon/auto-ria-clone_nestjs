import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';
import { ArticleEntity } from './article.entity';

@Index(['brand', 'model', 'cost'])
@Entity(TableNameEnum.CAR)
export class CarEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarID;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column('decimal')
  cost: number;

  @OneToMany(() => ArticleEntity, (entity) => entity.car)
  articles?: ArticleEntity[];
}
