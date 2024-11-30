import { ListReportsQueryDto } from '../req/list-reports.query.dto';
import { ReportResDto } from './report.res.dto';

export class ReportsListResDto extends ListReportsQueryDto {
  data: ReportResDto[];
  total: number;
}
