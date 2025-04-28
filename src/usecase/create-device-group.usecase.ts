import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DeviceGroup } from '../domain/device-group.domain';
import { DeviceGroupOutputPort } from '../port/output/device-group.output-port';
import { CreateDeviceGroupDto } from './dto/create-device-group.dto';
import { ALREADY_EXIST_DEVICE_GROUP } from '../shared/error-code/device-group.error-code';

@Injectable()
export class CreateDeviceGroupUsecase {
  constructor(
    @Inject('DeviceGroupOutputPort')
    private readonly deviceGroupOutputPort: DeviceGroupOutputPort,
  ) {}

  async execute(dto: CreateDeviceGroupDto): Promise<DeviceGroup> {
    const deviceGroup = await this.deviceGroupOutputPort.findOne(
      dto.serialNumber,
    );

    if (deviceGroup) {
      throw new BadRequestException(ALREADY_EXIST_DEVICE_GROUP.ErrorInfo);
    }

    return this.deviceGroupOutputPort.create(
      new DeviceGroup({
        serialNumber: dto.serialNumber,
      }),
    );
  }
}
