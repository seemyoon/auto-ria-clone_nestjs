import { Module } from '@nestjs/common';

import { ReportsController } from './controller/reports.controller';
import { ReportsService } from './service/reports.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
