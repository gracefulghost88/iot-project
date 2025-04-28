import { CreateDeviceGroupDto } from 'src/usecase/dto/create-device-group.dto';
import { CreateDeviceGroupRequestDto } from '../dto/create-device-group.request.dto';

export class CreateDeviceGroupRequestMapper {
  constructor(private readonly request: CreateDeviceGroupRequestDto) {}

  toDomain(): CreateDeviceGroupDto {
    return {
      serialNumber: this.request.deviceGroupSerial,
    };
  }
}
