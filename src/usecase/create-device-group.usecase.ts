import { Inject, Injectable } from '@nestjs/common';
import { DeviceGroup } from '../domain/device-group.domain';
import { DeviceGroupOutputPort } from '../port/output/device-group.output-port';
import { CreateDeviceGroupDto } from './dto/create-device-group.dto';

@Injectable()
export class CreateDeviceGroupUsecase {
  constructor(
    @Inject('DeviceGroupOutputPort')
    private readonly deviceGroupOutputPort: DeviceGroupOutputPort,
  ) {}

  async execute(dto: CreateDeviceGroupDto): Promise<DeviceGroup> {
    return this.deviceGroupOutputPort.create(
      new DeviceGroup({
        serialNumber: dto.serialNumber,
      }),
    );
  }
}
