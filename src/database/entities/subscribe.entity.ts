import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SubscribeID, UserID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.SUBSCRIBE)
export class SubscribeEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: SubscribeID;

  @Column()
  user_id: UserID;
  @OneToOne(() => UserEntity, (entity) => entity.subscribe, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
