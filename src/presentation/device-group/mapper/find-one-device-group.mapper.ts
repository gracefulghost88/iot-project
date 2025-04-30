import { CreateDeviceGroupDto } from '../../../usecase/dto/create-device-group.dto';
import { FindOneDeviceGroupRequestDto } from '../dto/find-one-device-group.request.dto';

export class FindOneDeviceGroupRequestMapper {
  constructor(private readonly request: FindOneDeviceGroupRequestDto) {}

  toDomain(): CreateDeviceGroupDto {
    return {
      serialNumber: this.request.deviceGroupSerial,
    };
  }
}
