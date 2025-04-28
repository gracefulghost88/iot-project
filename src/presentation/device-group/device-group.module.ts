import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateDeviceGroupUsecase } from '../../usecase/create-device-group.usecase';
import DeviceGroupController from './device-group.controller';
import { DeviceGroupRepository } from '../../infrastructure/typeorm/repository/device-group.repository';
import { DeviceGroupEntity } from '../../infrastructure/typeorm/entity/device-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceGroupEntity])],
  providers: [
    CreateDeviceGroupUsecase,
    {
      provide: 'DeviceGroupOutputPort',
      useClass: DeviceGroupRepository,
    },
  ],
  controllers: [DeviceGroupController],
})
export class DeviceGroupModule {}
