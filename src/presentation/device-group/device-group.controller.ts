import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { CreateDeviceGroupUsecase } from '../../usecase/create-device-group.usecase';
import { CreateDeviceGroupRequestDto } from './dto/create-device-group.request.dto';
import { CreateDeviceGroupRequestMapper } from './mapper/create-device-group.mapper';
import { CreateDeviceGroupResponseDto } from './dto/create-device-group.response.dto';
import { RemoveDeviceGroupRequestDto } from './dto/remove-device-group.request.dto';
import { RemoveDeviceGroupUsecase } from '../../usecase/remove-device-group.usecase';
import { RemoveDeviceGroupRequestMapper } from './mapper/remove-device-group.mapper';

@Controller('devices-groups')
export default class DeviceGroupController {
  constructor(
    private readonly createDeviceGroupUsecase: CreateDeviceGroupUsecase,
    private readonly removeDeviceGroupUsecase: RemoveDeviceGroupUsecase,
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

  @Delete()
  @HttpCode(204)
  async removeDeviceGroup(
    @Body() dto: RemoveDeviceGroupRequestDto,
  ): Promise<void> {
    await this.removeDeviceGroupUsecase.execute(
      new RemoveDeviceGroupRequestMapper(dto).toDomain(),
    );
  }
}
