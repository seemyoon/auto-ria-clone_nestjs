import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { CarRegionID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';

@Entity(TableNameEnum.CAR_REGIONS)
export class CarRegionsEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarRegionID;

  @Column('text')
  region: string;
}
