// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getEmployerById GET /api/employer/get/${param0} */
export async function getEmployerByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEmployerByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.BaseResponseEmployerVO>(`/api/employer/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getCurrentEmployer GET /api/employer/get/current */
export async function getCurrentEmployerUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseEmployerVO>('/api/employer/get/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** pageEmployer POST /api/employer/page */
export async function pageEmployerUsingPost(
  body: API.EmployerQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageEmployerVO>('/api/employer/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** employUpdate POST /api/employer/update */
export async function employUpdateUsingPost1(
  body: API.EmployerUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/employer/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
