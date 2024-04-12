// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addCompany POST /api/company/add */
export async function addCompanyUsingPost(
  body: API.CompanyAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/company/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCompany POST /api/company/delete */
export async function deleteCompanyUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/company/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCompany GET /api/company/get/${param0} */
export async function getCompanyUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCompanyUsingGETParams,
  options?: { [key: string]: any },
) {
  const { companyId: param0, ...queryParams } = params;
  return request<API.BaseResponseCompanyVO>(`/api/company/get/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** pageCompany POST /api/company/page */
export async function pageCompanyUsingPost(
  body: API.CompanyQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCompanyVO>('/api/company/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateCompany POST /api/company/update */
export async function updateCompanyUsingPost(
  body: API.CompanyUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/company/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
