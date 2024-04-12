// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listMajor GET /api/major/get/list */
export async function listMajorUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListMajorVO>('/api/major/get/list', {
    method: 'GET',
    ...(options || {}),
  });
}
