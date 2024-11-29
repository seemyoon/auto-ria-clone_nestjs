import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  ArticleID,
  ReportAfter3ChangesID,
} from '../../common/types/entity-ids.type';
import { TableNameEnum } from '../enums/table-name.enum';
import { ArticleEntity } from './article.entity';
import { ReportEntity } from './report.entity';

@Entity(TableNameEnum.REPORT_AFTER_3_CHANGES)
export class ReportAfter3ChangesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: ReportAfter3ChangesID;

  @Column()
  article_id: ArticleID;
  @OneToOne(() => ArticleEntity, (entity) => entity.report_after_3_changes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'article_id' })
  article?: ArticleEntity;

  @ManyToOne(() => ReportEntity, (report) => report.changesAfter3TimesReports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'report_id' })
  report: ReportEntity;
}
