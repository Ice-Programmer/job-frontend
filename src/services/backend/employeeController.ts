// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getEmployeeById GET /api/employee/get/${param0} */
export async function getEmployeeByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEmployeeByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { userId: param0, ...queryParams } = params;
  return request<API.BaseResponseEmployeeVO>(`/api/employee/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getCurrentEmployee GET /api/employee/get/current */
export async function getCurrentEmployeeUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseEmployeeVO>('/api/employee/get/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** employUpdate POST /api/employee/update */
export async function employUpdateUsingPost(
  body: API.EmployeeUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/employee/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
