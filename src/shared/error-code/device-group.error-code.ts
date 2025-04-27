import { ApiProperty } from '@nestjs/swagger';

export class MISSING_DEVICE_GROUP_SERIAL {
  static readonly ErrorInfo = {
    code: 'MISSING_DEVICE_GROUP_SERIAL',
    message: 'deviceGroupSerial is missing.',
  };

  @ApiProperty({
    description: MISSING_DEVICE_GROUP_SERIAL.ErrorInfo.code,
    type: 'string',
    example: MISSING_DEVICE_GROUP_SERIAL.ErrorInfo.code,
  })
  code!: string;

  @ApiProperty({
    description: MISSING_DEVICE_GROUP_SERIAL.ErrorInfo.message,
    type: 'string',
    example: MISSING_DEVICE_GROUP_SERIAL.ErrorInfo.message,
  })
  message!: string;
}

export class ALREADY_EXIST_DEVICE_GROUP {
  static readonly ErrorInfo = {
    code: 'ALREADY_EXIST_DEVICE_GROUP',
    message: 'device group does exist already.',
  };

  @ApiProperty({
    description: ALREADY_EXIST_DEVICE_GROUP.ErrorInfo.code,
    type: 'string',
    example: ALREADY_EXIST_DEVICE_GROUP.ErrorInfo.code,
  })
  code!: string;

  @ApiProperty({
    description: ALREADY_EXIST_DEVICE_GROUP.ErrorInfo.message,
    type: 'string',
    example: ALREADY_EXIST_DEVICE_GROUP.ErrorInfo.message,
  })
  message!: string;
}
