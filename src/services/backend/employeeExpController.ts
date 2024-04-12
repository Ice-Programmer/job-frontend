// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addExperience POST /api/employee/experience/add */
export async function addExperienceUsingPost(
  body: API.ExperienceAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/employee/experience/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteExperience POST /api/employee/experience/delete */
export async function deleteExperienceUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/employee/experience/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getExperience GET /api/employee/experience/get/${param0} */
export async function getExperienceUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getExperienceUsingGETParams,
  options?: { [key: string]: any },
) {
  const { experienceId: param0, ...queryParams } = params;
  return request<API.BaseResponseEmployeeExperienceVO>(`/api/employee/experience/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** pageExperience POST /api/employee/experience/page */
export async function pageExperienceUsingPost(
  body: API.ExperienceQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageEmployeeExperienceVO>('/api/employee/experience/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateExperience POST /api/employee/experience/update */
export async function updateExperienceUsingPost(
  body: API.ExperienceUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/employee/experience/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
