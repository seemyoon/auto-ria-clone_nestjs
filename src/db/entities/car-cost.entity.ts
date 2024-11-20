import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { CarPriceID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';

@Index(['cost'])
@Entity(TableNameEnum.CAR_PRICE)
export class CarCostEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarPriceID;

  @Column('decimal')
  cost: number;

  @Column('text')
  region: string;
}
