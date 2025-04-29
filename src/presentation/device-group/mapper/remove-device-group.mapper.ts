import { CreateDeviceGroupDto } from 'src/usecase/dto/create-device-group.dto';
import { RemoveDeviceGroupRequestDto } from '../dto/remove-device-group.request.dto';

export class RemoveDeviceGroupRequestMapper {
  constructor(private readonly request: RemoveDeviceGroupRequestDto) {}

  toDomain(): CreateDeviceGroupDto {
    return {
      serialNumber: this.request.deviceGroupSerial,
    };
  }
}
