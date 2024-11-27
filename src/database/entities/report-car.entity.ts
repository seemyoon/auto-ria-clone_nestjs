import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ReportID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { ReportEntity } from './report.entity';

@Entity(TableNameEnum.REPORT_CAR)
export class ReportCarEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ReportID;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  model?: string;

  @ManyToOne(() => ReportEntity, (report) => report.carReports)
  @JoinColumn({ name: 'report_id' })
  report: ReportEntity;
}
