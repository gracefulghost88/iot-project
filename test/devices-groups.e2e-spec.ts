import * as request from 'supertest';

import { server } from './globalSetup';
import {
  ALREADY_EXIST_DEVICE_GROUP,
  MISSING_DEVICE_GROUP_SERIAL,
} from '../src/shared/error-code/device-group.error-code';

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
    it.each`
      testName                                    | deviceGroupSerial | responseStatus | errorInfo
      ${'[400] deviceGroupSerial is missing.'}    | ${undefined}      | ${400}         | ${MISSING_DEVICE_GROUP_SERIAL.ErrorInfo}
      ${'[400] device group does exist already.'} | ${'A7'}           | ${400}         | ${ALREADY_EXIST_DEVICE_GROUP.ErrorInfo}
      ${'[200] OK'}                               | ${'A5'}           | ${200}         | ${undefined}
    `('$testName', async ({ deviceGroupSerial, responseStatus }) => {
      const response = await request(server.app.getHttpServer())
        .post(`/devices-groups`)
        .set('Content-Type', 'application/json')
        .send({ deviceGroupSerial });

      expect(response.status).toBe(responseStatus);
    });
  });
});
