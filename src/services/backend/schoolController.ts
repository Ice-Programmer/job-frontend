// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listSchool GET /api/school/get/list */
export async function listSchoolUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListSchoolVO>('/api/school/get/list', {
    method: 'GET',
    ...(options || {}),
  });
}
