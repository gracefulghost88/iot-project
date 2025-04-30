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
  describe('GET 장비 그룹 목록 조회', () => {
    let createdDeviceGroups: RemoveDeviceGroupDto[] = [];

    beforeAll(async () => {
      const createDeviceGroupUsecase =
        server.moduleRef?.get<CreateDeviceGroupUsecase>(
          CreateDeviceGroupUsecase,
        );
      if (createDeviceGroupUsecase) {
        const deviceGroup1 = await createDeviceGroupUsecase.execute({
          serialNumber: 'A1',
        });
        const deviceGroup2 = await createDeviceGroupUsecase.execute({
          serialNumber: 'A2',
        });
        const deviceGroup3 = await createDeviceGroupUsecase.execute({
          serialNumber: 'A3',
        });

        createdDeviceGroups = [
          { serialNumber: deviceGroup1.serialNumber },
          { serialNumber: deviceGroup2.serialNumber },
          { serialNumber: deviceGroup3.serialNumber },
        ];
      }
    });

    afterAll(async () => {
      const removeDeviceGroupUsecase =
        server.moduleRef?.get<RemoveDeviceGroupUsecase>(
          RemoveDeviceGroupUsecase,
        );

      for (const deviceGroup of createdDeviceGroups) {
        await removeDeviceGroupUsecase.execute(deviceGroup);
      }
    });

    it.each`
      testName      | responseStatus
      ${'[200] Ok'} | ${200}
    `('$testName', async ({ responseStatus }) => {
      const response = await request(server.app.getHttpServer())
        .get(`/devices-groups`)
        .set('Content-Type', 'application/json')
        .send();

      expect(response.status).toBe(responseStatus);

      if (response.status === 200) {
        expect(response.body.msg).toBe('success');
        expect(response.body.data).toHaveLength(3);
        expect(response.body.data[0].serialNumber).toBe('A1');
        expect(response.body.data[1].serialNumber).toBe('A2');
        expect(response.body.data[2].serialNumber).toBe('A3');
      }
    });
  });

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

  describe('GET 장비 그룹 조회', () => {
    let createdDeviceGroup: RemoveDeviceGroupDto;

    beforeAll(async () => {
      const createDeviceGroupUsecase =
        server.moduleRef?.get<CreateDeviceGroupUsecase>(
          CreateDeviceGroupUsecase,
        );
      if (createDeviceGroupUsecase) {
        const deviceGroup = await createDeviceGroupUsecase.execute({
          serialNumber: 'A1',
        });

        createdDeviceGroup = {
          serialNumber: deviceGroup.serialNumber,
        } as unknown as RemoveDeviceGroupDto;
      }
    });

    afterAll(async () => {
      const removeDeviceGroupUsecase =
        server.moduleRef?.get<RemoveDeviceGroupUsecase>(
          RemoveDeviceGroupUsecase,
        );

      if (removeDeviceGroupUsecase) {
        await removeDeviceGroupUsecase.execute(createdDeviceGroup);
      }
    });

    it.each`
      testName                               | deviceGroupSerial | responseStatus | expectedData
      ${'[404] deviceGroup does not exist.'} | ${'A88'}          | ${404}         | ${null}
      ${'[200] Ok'}                          | ${'A1'}           | ${200}         | ${{ serialNumber: 'A1' }}
    `(
      '$testName',
      async ({ deviceGroupSerial, responseStatus, expectedData }) => {
        const response = await request(server.app.getHttpServer())
          .get(`/devices-groups/${deviceGroupSerial}`)
          .set('Content-Type', 'application/json')
          .send();

        expect(response.status).toBe(responseStatus);

        if (response.status === 200) {
          expect(response.body.msg).toBe('success');
          expect(response.body.data.serialNumber).toBe(
            expectedData.serialNumber,
          );
        }
      },
    );
  });

  describe('DELETE 장비 그룹 삭제', () => {
    let removeDeviceGroupDto: RemoveDeviceGroupDto = null;

    beforeAll(async () => {
      const createDeviceGroupUsecase =
        server.moduleRef?.get<CreateDeviceGroupUsecase>(
          CreateDeviceGroupUsecase,
        );
      if (createDeviceGroupUsecase) {
        const deviceGroup = await createDeviceGroupUsecase.execute({
          serialNumber: 'A5',
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
      testName                               | deviceGroupSerial | responseStatus
      ${'[404] deviceGroup does not exist.'} | ${'A88'}          | ${404}
      ${'[204] No content'}                  | ${'A5'}           | ${204}
    `('$testName', async ({ deviceGroupSerial, responseStatus }) => {
      const response = await request(server.app.getHttpServer())
        .delete(`/devices-groups/${deviceGroupSerial}`)
        .set('Content-Type', 'application/json')
        .send();

      expect(response.status).toBe(responseStatus);

      if (response.status === 204) {
        removeDeviceGroupDto = null;
      }
    });
  });
});
