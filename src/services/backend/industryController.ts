// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getIndustryList GET /api/industry/career/get/list */
export async function getIndustryListUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListCareerIndustryVO>('/api/industry/career/get/list', {
    method: 'GET',
    ...(options || {}),
  });
}
