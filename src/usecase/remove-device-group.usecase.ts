import { BadRequestException, Inject } from '@nestjs/common';
import { DeviceGroupOutputPort } from '../port/output/device-group.output-port';
import { RemoveDeviceGroupDto } from './dto/remove-device-group.dto';
import { NOT_EXIST_DEVICE_GROUP } from '../shared/error-code/device-group.error-code';

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
      throw new BadRequestException(NOT_EXIST_DEVICE_GROUP.ErrorInfo);
    }

    return this.deviceGroupOutputPort.remove(deviceGroup);
  }
}
