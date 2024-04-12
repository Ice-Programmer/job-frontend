// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getAddressList GET /api/city/get/list */
export async function getAddressListUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListAddressVO>('/api/city/get/list', {
    method: 'GET',
    ...(options || {}),
  });
}
