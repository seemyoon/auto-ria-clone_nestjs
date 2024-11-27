import { ListCarsQueryDto } from '../req/list-cars.query.dto';
import { CarResDto } from './car.res.dto';

export class CarsListResDto extends ListCarsQueryDto {
  data: CarResDto[];
  total: number;
}
