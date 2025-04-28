import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('devices_groups')
@Index('idx_devices_groups_serial_number', ['serialNumber'], { unique: true })
export class DeviceGroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '일련번호' })
  id!: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'serial_number',
    comment: '장비 그룹 시리얼번호',
  })
  serialNumber!: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '생성일시',
  })
  createdAt!: Date;
}
