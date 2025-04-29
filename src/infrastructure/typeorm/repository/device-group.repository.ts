import { Repository } from 'typeorm';
import { DeviceGroupOutputPort } from '../../../port/output/device-group.output-port';
import { DeviceGroupEntity } from '../entity/device-group.entity';
import { DeviceGroup } from '../../../domain/device-group.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceGroupMapper } from '../mapper/device-group-entity.mapper';

export class DeviceGroupRepository implements DeviceGroupOutputPort {
  constructor(
    @InjectRepository(DeviceGroupEntity)
    private readonly deviceGroupRepository: Repository<DeviceGroupEntity>,
  ) {}

  async findAll(): Promise<DeviceGroup[]> {
    const result = await this.deviceGroupRepository.find();
    return result.map((deviceGroup) =>
      new DeviceGroupMapper(deviceGroup).toDomain(),
    );
  }

  async findOne(serialNumber: string): Promise<DeviceGroup | null> {
    const result = await this.deviceGroupRepository.findOne({
      where: { serialNumber },
    });

    if (!result) {
      return null;
    }

    return new DeviceGroupMapper(result).toDomain();
  }

  async create(deviceGroup: DeviceGroup): Promise<DeviceGroup> {
    const result = await this.deviceGroupRepository.save(
      this.deviceGroupRepository.create(deviceGroup),
    );
    return new DeviceGroupMapper(result).toDomain();
  }

  async remove(deviceGroup: DeviceGroup): Promise<void> {
    await this.deviceGroupRepository.delete(deviceGroup);
  }
}
