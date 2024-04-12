// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getCareerList GET /api/position/career/get/list */
export async function getCareerListUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCareerVO>('/api/position/career/get/list', {
    method: 'GET',
    ...(options || {}),
  });
}
