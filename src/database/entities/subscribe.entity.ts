import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { SubscribeID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';

@Entity(TableNameEnum.SUBSCRIBE)
export class SubscribeEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: SubscribeID;

  @Column('text')
  subscriptionTime: Date;
}
