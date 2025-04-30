import { ApiProperty } from '@nestjs/swagger';
import { DateTime } from 'luxon';
import { DeviceGroup } from '../../../domain/device-group.domain';
import { Type } from 'class-transformer';

export class DeviceGroupDto {
  @ApiProperty({ description: '장비 그룹 아이디', required: true, example: 1 })
  deviceGroupId: number;

  @ApiProperty({
    description: '장비 그룹 시리얼 번호',
    required: true,
    example: 'C48302DDL',
  })
  serialNumber: string;

  @ApiProperty({
    description: '장비 그룹 생성일시(UTC)',
    required: true,
    format: 'yyyy-MM-ddTHH:mm:ssZ',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: string;

  constructor(deviceGroup: DeviceGroup) {
    this.deviceGroupId = +deviceGroup.id;
    this.serialNumber = deviceGroup.serialNumber;
    this.createdAt = DateTime.fromJSDate(deviceGroup.createdAt)
      .toUTC()
      .toFormat(`yyyy-MM-ddTHH:mm:ssZ`);
  }
}

export class FindOneDeviceGroupResponseDto {
  @ApiProperty({
    description: '성공 메시지',
    required: true,
    example: 'success',
  })
  msg: string;

  @ApiProperty({
    description: '장비 데이터',
    required: true,
    type: () => DeviceGroupDto,
  })
  @Type(() => DeviceGroupDto)
  data: DeviceGroupDto;

  constructor(deviceGroup: DeviceGroup) {
    this.msg = 'success';
    this.data = new DeviceGroupDto(deviceGroup);
  }
}
