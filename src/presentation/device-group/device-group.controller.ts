import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common';
import { CreateDeviceGroupUsecase } from '../../usecase/create-device-group.usecase';
import { CreateDeviceGroupRequestDto } from './dto/create-device-group.request.dto';
import { CreateDeviceGroupRequestMapper } from './mapper/create-device-group.mapper';
import { CreateDeviceGroupResponseDto } from './dto/create-device-group.response.dto';
import { RemoveDeviceGroupRequestDto } from './dto/remove-device-group.request.dto';
import { RemoveDeviceGroupUsecase } from '../../usecase/remove-device-group.usecase';
import { RemoveDeviceGroupRequestMapper } from './mapper/remove-device-group.mapper';
import { FindAllDeviceGroupUsecase } from '../../usecase/find-all-device-group.usecase';
import { FindAllDeviceGroupResponseDto } from './dto/find-all-device-group.response.dto';

@Controller('devices-groups')
export default class DeviceGroupController {
  constructor(
    private readonly findAllDeviceGroupUsecase: FindAllDeviceGroupUsecase,
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

  @Get()
  async findAllDeviceGroups(): Promise<FindAllDeviceGroupResponseDto> {
    const deviceGroups = await this.findAllDeviceGroupUsecase.execute();

    return new FindAllDeviceGroupResponseDto(deviceGroups);
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
