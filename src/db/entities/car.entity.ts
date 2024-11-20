import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { CarID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';

@Index(['brand', 'model'])
@Entity(TableNameEnum.CAR)
export class CarEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarID;

  @Column()
  brand: string;

  @Column()
  model: string;
}
