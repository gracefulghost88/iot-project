export class Device {
  id: string;
  serialNumber: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, serialNumber: string) {
    this.id = id;
    this.serialNumber = serialNumber;
  }
}
