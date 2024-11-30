import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ReportCarID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { ReportEntity } from './report.entity';

@Entity(TableNameEnum.REPORT_CAR)
export class ReportCarEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ReportCarID;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  model?: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => ReportEntity, (report) => report.carReport, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: ReportEntity;
}
