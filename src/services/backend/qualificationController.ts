// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** updateEmployeeQualification POST /api/qualification/employee/update */
export async function updateEmployeeQualificationUsingPost(
  body: API.QualificationEmployeeUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/qualification/employee/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getQualificationList GET /api/qualification/get/list */
export async function getQualificationListUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListQualificationVO>('/api/qualification/get/list', {
    method: 'GET',
    ...(options || {}),
  });
}
