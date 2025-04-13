import { Device } from './device.domain';

export class DeviceGroup {
  id: string;
  serialNumber: string;
  createdAt: Date;
  updatedAt: Date;
  devices?: Device[];

  constructor(id: string, serialNumber: string) {
    this.id = id;
    this.serialNumber = serialNumber;
  }
}
