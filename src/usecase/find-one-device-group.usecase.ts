import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeviceGroup } from '../domain/device-group.domain';
import { DeviceGroupOutputPort } from '../port/output/device-group.output-port';
import { FindOneDeviceGroupDto } from './dto/find-one-device-group.dto';

@Injectable()
export class FindOneDeviceGroupUsecase {
  constructor(
    @Inject('DeviceGroupOutputPort')
    private readonly deviceGroupOutputPort: DeviceGroupOutputPort,
  ) {}

  async execute(dto: FindOneDeviceGroupDto): Promise<DeviceGroup> {
    const deviceGroup = await this.deviceGroupOutputPort.findOne(
      dto.serialNumber,
    );

    if (!deviceGroup) {
      throw new NotFoundException();
    }

    return deviceGroup;
  }
}
