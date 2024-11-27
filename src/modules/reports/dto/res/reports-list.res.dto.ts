import { ListReportsQueryDto } from '../req/list-reports.query.dto';

export class ReportsListResDto extends ListReportsQueryDto {
  data: ListReportsQueryDto[];
  total: number;
}
