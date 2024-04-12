// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addRecruitment POST /api/recruitment/add */
export async function addRecruitmentUsingPost(
  body: API.RecruitmentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/recruitment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteRecruitment POST /api/recruitment/delete */
export async function deleteRecruitmentUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/recruitment/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getRecruitment GET /api/recruitment/get/${param0} */
export async function getRecruitmentUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRecruitmentUsingGETParams,
  options?: { [key: string]: any },
) {
  const { recruitmentId: param0, ...queryParams } = params;
  return request<API.BaseResponseRecruitmentVO>(`/api/recruitment/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** pageRecruitment POST /api/recruitment/page */
export async function pageRecruitmentUsingPost(
  body: API.RecruitmentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRecruitmentVO>('/api/recruitment/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateRecruitment POST /api/recruitment/update */
export async function updateRecruitmentUsingPost(
  body: API.RecruitmentUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/recruitment/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
