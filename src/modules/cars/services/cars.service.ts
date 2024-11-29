import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { CarID, UserID } from '../../../common/types/entity-ids.type';
import { CarEntity } from '../../../database/entities/car.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarRepository } from '../../repository/service/car.repository';
import { UserRepository } from '../../repository/service/user.repository';
import { UserEnum } from '../../users/enum/users.enum';
import { ListUsersQueryDto } from '../../users/models/req/list-users.query.dto';
import { CarReqDto } from '../dto/req/car.req.dto';
import { UpdateCarReqDto } from '../dto/req/update-car.req.dto';

@Injectable()
export class CarsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly carRepository: CarRepository,
  ) {}

  public async getCar(carId: CarID): Promise<CarEntity> {
    const car = await this.carRepository.findByCarId(carId);
    if (!car) {
      throw new BadRequestException('Region not found');
    }
    return car;
  }

  public async updateCar(
    userData: IUserData,
    dto: UpdateCarReqDto,
    carId: CarID,
  ): Promise<CarEntity> {
    await this.isUserOrManager(userData.userId);

    const car = await this.returnedCarOrThrow(carId);

    if (dto.brand) {
      car.brand = dto.brand;
    }

    if (dto.model) {
      car.model = dto.model;
    }

    await this.carRepository.save(car);
    return car;
  }

  public async getCars(
    query: ListUsersQueryDto,
  ): Promise<[CarEntity[], number]> {
    return await this.carRepository.findAll(query);
  }

  public async createCar(
    userData: IUserData,
    dto: CarReqDto,
  ): Promise<CarEntity> {
    await this.isUserOrManager(userData.userId);

    return await this.carRepository.save(
      this.carRepository.create({
        brand: dto.brand,
        model: dto.model,
      }),
    );
  }

  private async returnedCarOrThrow(carId: CarID): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new ConflictException('Car not found');
    }
    return car;
  }

  private async isUserOrManager(userId: UserID): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (![UserEnum.ADMIN, UserEnum.MANAGER].includes(user.role)) {
      throw new BadRequestException('Invalid role');
    }
  }
}
