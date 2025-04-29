import { Inject, Injectable } from '@nestjs/common';
import { DeviceGroup } from '../domain/device-group.domain';
import { DeviceGroupOutputPort } from '../port/output/device-group.output-port';

@Injectable()
export class FindAllDeviceGroupUsecase {
  constructor(
    @Inject('DeviceGroupOutputPort')
    private readonly deviceGroupOutputPort: DeviceGroupOutputPort,
  ) {}

  async execute(): Promise<DeviceGroup[]> {
    const deviceGroups = await this.deviceGroupOutputPort.findAll();
    return deviceGroups;
  }
}
