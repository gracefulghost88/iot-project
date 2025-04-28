import { DeviceGroup } from '../../domain/device-group.domain';

export interface DeviceGroupOutputPort {
  findOne(serialNumber: string): Promise<DeviceGroup>;
  create(deviceGroup: DeviceGroup): Promise<DeviceGroup>;
  remove(deviceGroup: DeviceGroup): Promise<void>;
}
