import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { MISSING_DEVICE_GROUP_SERIAL } from '../../../shared/error-code/device-group.error-code';

export class CreateDeviceGroupRequestDto {
  @ApiProperty({
    description: '장비 그룹 시리얼 번호입니다.',
    required: true,
    example: 'A1',
  })
  @IsNotEmpty({ context: MISSING_DEVICE_GROUP_SERIAL.ErrorInfo })
  deviceGroupSerial: string;
}
