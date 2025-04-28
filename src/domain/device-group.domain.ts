import { Device } from './device.domain';

export class DeviceGroup {
  id: string;
  serialNumber: string;
  createdAt: Date;
  updatedAt: Date;
  devices?: Device[];

  constructor(param: { serialNumber: string }) {
    this.serialNumber = param.serialNumber;
  }

  setId(id: string) {
    this.id = id;
  }
}
