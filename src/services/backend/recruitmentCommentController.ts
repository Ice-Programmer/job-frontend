// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addRecruitmentComment POST /api/recruitment/comment/add */
export async function addRecruitmentCommentUsingPost(
  body: API.RecruitmentCommentAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/recruitment/comment/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** pageRecruitmentComment POST /api/recruitment/comment/page/vo */
export async function pageRecruitmentCommentUsingPost(
  body: API.RecruitmentCommentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRecruitmentCommentVO>('/api/recruitment/comment/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
