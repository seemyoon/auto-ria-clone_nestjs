import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { CarDealerShipID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';

@Entity(TableNameEnum.CAR_DEALER_SHIP)
export class CarDealerShipEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: CarDealerShipID;

  @Column('text', { unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;
}
