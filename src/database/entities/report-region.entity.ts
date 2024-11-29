import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ReportID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { ReportEntity } from './report.entity';

@Entity(TableNameEnum.REPORT_REGION)
export class ReportRegionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ReportID;

  @Column()
  region: string;

  @ManyToOne(() => ReportEntity, (report) => report.regionReports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: ReportEntity;
}
