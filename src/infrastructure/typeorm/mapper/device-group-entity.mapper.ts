import { DeviceGroup } from '../../../domain/device-group.domain';
import { DeviceGroupEntity } from '../entity/device-group.entity';

export class DeviceGroupMapper {
  constructor(private readonly entity: DeviceGroupEntity) {}

  toDomain(): DeviceGroup {
    const deviceGroup = new DeviceGroup({
      serialNumber: this.entity.serialNumber,
    });

    deviceGroup.id = this.entity.id;

    return deviceGroup;
  }
}
