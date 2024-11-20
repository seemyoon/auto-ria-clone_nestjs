import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserID } from '../../common/types/entity-ids.type';
import { UserEnum } from '../../modules/users/enum/users.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { CreateUpdateModel } from '../models/create-update.model';

@Entity(TableNameEnum.USERS)
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: UserID;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  name: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  image?: string;

  @Column('timestamp', { nullable: true })
  deleted?: Date;

  @Column({ type: 'enum', enum: UserEnum })
  role: UserEnum;
}
