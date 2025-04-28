import { Body, Controller, Post } from '@nestjs/common';
import { CreateDeviceGroupUsecase } from '../../usecase/create-device-group.usecase';
import { CreateDeviceGroupRequestDto } from './dto/create-device-group.request.dto';
import { CreateDeviceGroupRequestMapper } from './mapper/create-device-group.mapper';
import { CreateDeviceGroupResponseDto } from './dto/create-device-group.response.dto';

@Controller('devices-groups')
export default class DeviceGroupController {
  constructor(
    private readonly createDeviceGroupUsecase: CreateDeviceGroupUsecase,
  ) {}

  @Post()
  async createDeviceGroup(
    @Body() dto: CreateDeviceGroupRequestDto,
  ): Promise<CreateDeviceGroupResponseDto> {
    const deviceGroup = await this.createDeviceGroupUsecase.execute(
      new CreateDeviceGroupRequestMapper(dto).toDomain(),
    );

    return new CreateDeviceGroupResponseDto(deviceGroup);
  }
}
