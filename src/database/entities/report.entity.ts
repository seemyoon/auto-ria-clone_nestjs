import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ReportID, UserID } from '../../common/types/entity-ids.type';
import { ReportEnum } from '../../modules/reports/enum/report.enum';
import { TableNameEnum } from '../enums/table-name.enum';
import { ReportAfter3ChangesEntity } from './report-after-3-changes.entity';
import { ReportCarEntity } from './report-car.entity';
import { ReportRegionEntity } from './report-region.entity';
import { UserEntity } from './user.entity';

@Entity(TableNameEnum.REPORT)
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ReportID;

  @Column({ type: 'enum', enum: ReportEnum })
  type: ReportEnum;

  @CreateDateColumn()
  created: Date;

  @Column()
  user_id: UserID;
  @ManyToOne(() => UserEntity, (entity) => entity.reports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToOne(() => ReportCarEntity, (reportCar) => reportCar.report)
  carReport: ReportCarEntity;

  @OneToOne(() => ReportRegionEntity, (reportRegion) => reportRegion.report)
  regionReport: ReportRegionEntity;

  @OneToOne(
    () => ReportAfter3ChangesEntity,
    (report3Changes) => report3Changes.report,
  )
  changesAfter3TimesReport: ReportAfter3ChangesEntity;
}
