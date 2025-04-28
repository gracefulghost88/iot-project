import { Body, Controller, Post } from '@nestjs/common';
import { DeviceGroup } from '../../domain/device-group.domain';
import { CreateDeviceGroupUsecase } from '../../usecase/create-device-group.usecase';
import { CreateDeviceGroupRequestDto } from './dto/create-device-group.request.dto';
import { CreateDeviceGroupRequestMapper } from './mapper/create-device-group.mapper';

@Controller('devices-groups')
export default class DeviceGroupController {
  constructor(
    private readonly createDeviceGroupUsecase: CreateDeviceGroupUsecase,
  ) {}

  @Post()
  async createDeviceGroup(
    @Body() dto: CreateDeviceGroupRequestDto,
  ): Promise<DeviceGroup> {
    return this.createDeviceGroupUsecase.execute(
      new CreateDeviceGroupRequestMapper(dto).toDomain(),
    );
  }
}
