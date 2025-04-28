import { DeviceGroup } from '../../domain/device-group.domain';

export interface DeviceGroupOutputPort {
  create(deviceGroup: DeviceGroup): Promise<DeviceGroup>;
  remove(deviceGroup: DeviceGroup): Promise<void>;
}
