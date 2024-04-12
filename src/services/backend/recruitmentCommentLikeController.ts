// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** likeOrDislikeRecruitmentComment POST /api/recruitment/comment/like/${param0} */
export async function likeOrDislikeRecruitmentCommentUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.likeOrDislikeRecruitmentCommentUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BaseResponseint>(`/api/recruitment/comment/like/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}
