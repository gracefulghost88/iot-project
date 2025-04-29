import * as request from 'supertest';

import { server } from './globalSetup';
import {
  ALREADY_EXIST_DEVICE_GROUP,
  MISSING_DEVICE_GROUP_SERIAL,
} from '../src/shared/error-code/device-group.error-code';
import { DeviceGroupDto } from '../src/presentation/device-group/dto/create-device-group.response.dto';
import { RemoveDeviceGroupUsecase } from '../src/usecase/remove-device-group.usecase';
import { RemoveDeviceGroupDto } from '../src/usecase/dto/remove-device-group.dto';
import { CreateDeviceGroupUsecase } from '../src/usecase/create-device-group.usecase';

beforeAll(async () => {
  if (server.status !== 'ready') {
    await server.init();
  }
});

afterAll(async () => {
  await server.teardown();
});

describe('DevicesGroups E2E Test', () => {
  describe('POST 장비 그룹 등록', () => {
    describe('장비 그룹 신규 등록', () => {
      let removeDeviceGroupDto: RemoveDeviceGroupDto = null;

      afterAll(async () => {
        const removeDeviceGroupUsecase =
          server.moduleRef?.get<RemoveDeviceGroupUsecase>(
            RemoveDeviceGroupUsecase,
          );

        if (removeDeviceGroupDto !== null) {
          await removeDeviceGroupUsecase.execute(removeDeviceGroupDto);
        }
      });

      it.each`
        testName                                 | deviceGroupSerial | responseStatus | errorInfo
        ${'[400] deviceGroupSerial is missing.'} | ${undefined}      | ${400}         | ${MISSING_DEVICE_GROUP_SERIAL.ErrorInfo}
        ${'[201] OK'}                            | ${'A5'}           | ${201}         | ${undefined}
      `(
        '$testName',
        async ({ deviceGroupSerial, responseStatus, errorInfo }) => {
          const response = await request(server.app.getHttpServer())
            .post(`/devices-groups`)
            .set('Content-Type', 'application/json')
            .send({ deviceGroupSerial });

          expect(response.status).toBe(responseStatus);

          if (response.status === 400) {
            expect(response.body).toEqual(errorInfo);
          } else if (response.status === 201) {
            expect(response.body.msg).toBe('success');
            expect((response.body.data as DeviceGroupDto).serialNumber).toBe(
              deviceGroupSerial,
            );

            const deviceGroupDto = response.body.data as DeviceGroupDto;
            removeDeviceGroupDto = {
              serialNumber: deviceGroupDto.serialNumber,
            } as unknown as RemoveDeviceGroupDto;
          }
        },
      );
    });

    describe('장비 그룹 중복 등록', () => {
      let removeDeviceGroupDto: RemoveDeviceGroupDto = null;

      beforeAll(async () => {
        const createDeviceGroupUsecase =
          server.moduleRef?.get<CreateDeviceGroupUsecase>(
            CreateDeviceGroupUsecase,
          );
        if (createDeviceGroupUsecase) {
          const deviceGroup = await createDeviceGroupUsecase.execute({
            serialNumber: 'A7',
          });

          removeDeviceGroupDto = {
            serialNumber: deviceGroup.serialNumber,
          } as unknown as RemoveDeviceGroupDto;
        }
      });

      afterAll(async () => {
        const removeDeviceGroupUsecase =
          server.moduleRef?.get<RemoveDeviceGroupUsecase>(
            RemoveDeviceGroupUsecase,
          );

        if (removeDeviceGroupDto !== null) {
          await removeDeviceGroupUsecase.execute(removeDeviceGroupDto);
        }
      });

      it.each`
        testName                                    | deviceGroupSerial | responseStatus | errorInfo
        ${'[400] device group does exist already.'} | ${'A7'}           | ${400}         | ${ALREADY_EXIST_DEVICE_GROUP.ErrorInfo}
      `(
        '$testName',
        async ({ deviceGroupSerial, responseStatus, errorInfo }) => {
          const response = await request(server.app.getHttpServer())
            .post(`/devices-groups`)
            .set('Content-Type', 'application/json')
            .send({ deviceGroupSerial });

          expect(response.status).toBe(responseStatus);

          if (response.status === 400) {
            expect(response.body).toEqual(errorInfo);
          }
        },
      );
    });
  });
});
