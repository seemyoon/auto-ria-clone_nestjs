import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PriceID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';

@Entity(TableNameEnum.PRICE)
export class Price {
  @PrimaryGeneratedColumn()
  id: PriceID;

  @Column()
  priceUsd: number;

  @Column()
  priceEur: number;

  @Column()
  priceUah: number;

  @Column()
  userPrice: number;

  @Column()
  currency: 'USD' | 'EUR' | 'UAH';

  @Column()
  exchangeRateUsd: number;

  @Column()
  exchangeRateEur: number;

  @Column()
  exchangeRateUah: number;

  @UpdateDateColumn()
  updated: Date;
}
