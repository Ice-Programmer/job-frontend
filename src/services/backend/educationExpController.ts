// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addEducation POST /api/education/experience/add */
export async function addEducationUsingPost(
  body: API.EducationAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/education/experience/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteEducation POST /api/education/experience/delete */
export async function deleteEducationUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/education/experience/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getEducation GET /api/education/experience/get/${param0} */
export async function getEducationUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getEducationUsingGETParams,
  options?: { [key: string]: any },
) {
  const { educationId: param0, ...queryParams } = params;
  return request<API.BaseResponseEmployeeEducationVO>(`/api/education/experience/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** pageEducation POST /api/education/experience/page */
export async function pageEducationUsingPost(
  body: API.EducationQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageEmployeeEducationVO>('/api/education/experience/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateEducation POST /api/education/experience/update */
export async function updateEducationUsingPost(
  body: API.EducationUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/education/experience/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
