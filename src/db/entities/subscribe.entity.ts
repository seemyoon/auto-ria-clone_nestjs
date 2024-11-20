import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { RefreshTokensID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';

@Entity(TableNameEnum.SUBSCRIBE)
export class RefreshTokenEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: RefreshTokensID;

  @Column('text')
  subscriptionTime: Date;
}
