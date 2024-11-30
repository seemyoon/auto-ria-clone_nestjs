import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ReportRegionID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { ReportEntity } from './report.entity';

@Entity(TableNameEnum.REPORT_REGION)
export class ReportRegionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ReportRegionID;

  @Column()
  region: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => ReportEntity, (report) => report.regionReport, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: ReportEntity;
}
