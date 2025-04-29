import { Inject, NotFoundException } from '@nestjs/common';
import { DeviceGroupOutputPort } from '../port/output/device-group.output-port';
import { RemoveDeviceGroupDto } from './dto/remove-device-group.dto';

export class RemoveDeviceGroupUsecase {
  constructor(
    @Inject('DeviceGroupOutputPort')
    private readonly deviceGroupOutputPort: DeviceGroupOutputPort,
  ) {}

  async execute(dto: RemoveDeviceGroupDto): Promise<void> {
    const deviceGroup = await this.deviceGroupOutputPort.findOne(
      dto.serialNumber,
    );

    if (!deviceGroup) {
      throw new NotFoundException();
    }

    return this.deviceGroupOutputPort.remove(deviceGroup);
  }
}
