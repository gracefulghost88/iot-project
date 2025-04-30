import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateDeviceGroupUsecase } from '../../usecase/create-device-group.usecase';
import DeviceGroupController from './device-group.controller';
import { DeviceGroupRepository } from '../../infrastructure/typeorm/repository/device-group.repository';
import { DeviceGroupEntity } from '../../infrastructure/typeorm/entity/device-group.entity';
import { RemoveDeviceGroupUsecase } from '../../usecase/remove-device-group.usecase';
import { FindAllDeviceGroupUsecase } from '../../usecase/find-all-device-group.usecase';
import { FindOneDeviceGroupUsecase } from '../../usecase/find-one-device-group.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceGroupEntity])],
  providers: [
    FindAllDeviceGroupUsecase,
    CreateDeviceGroupUsecase,
    FindOneDeviceGroupUsecase,
    RemoveDeviceGroupUsecase,
    {
      provide: 'DeviceGroupOutputPort',
      useClass: DeviceGroupRepository,
    },
  ],
  controllers: [DeviceGroupController],
})
export class DeviceGroupModule {}
