// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addEmployeeWishCareer POST /api/employee/career/wish/add */
export async function addEmployeeWishCareerUsingPost(
  body: API.EmployeeWishCareerAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/employee/career/wish/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteEmployeeWishCareer POST /api/employee/career/wish/delete */
export async function deleteEmployeeWishCareerUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/employee/career/wish/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getEmployeeWishCareer GET /api/employee/career/wish/get/${param0} */
export async function getEmployeeWishCareerUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEmployeeWishCareerUsingGETParams,
  options?: { [key: string]: any },
) {
  const { employeeWishCareerId: param0, ...queryParams } = params;
  return request<API.BaseResponseEmployeeWishCareerVO>(`/api/employee/career/wish/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** getWishPosition POST /api/employee/career/wish/get/ai */
export async function getWishPositionUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWishPositionUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListstring>('/api/employee/career/wish/get/ai', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** pageEmployeeWishCareer POST /api/employee/career/wish/page */
export async function pageEmployeeWishCareerUsingPost(
  body: API.EmployeeWishCareerQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageEmployeeWishCareerVO>('/api/employee/career/wish/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateEmployeeWishCareer POST /api/employee/career/wish/update */
export async function updateEmployeeWishCareerUsingPost(
  body: API.EmployeeWishCareerUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/employee/career/wish/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
