import { Avatar, Card, Flex, message, Rate } from "antd";
import React, { useState } from "react";
import './index.less'
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { likeOrDislikeRecruitmentCommentUsingPost } from "@/services/backend/recruitmentCommentLikeController";

const { Meta } = Card

interface Props {
  commentVO: API.RecruitmentCommentVO
}


const RecruitmentCommentCard: React.FC<Props> = (props) => {
  const { commentVO } = props
  const [hasLike, setHasLike] = useState<boolean>(commentVO.hasLiked ?? false);
  const [likeNum, setLikeNum] = useState<number>(commentVO.likeNum ?? 0);

  function formatDate(dateStr: string) {
    const [year, month, day] = dateStr.split('-');
    return year + "年" + month + "月" + day + "日";
  }

  const likeComment = async (commentId: number) => {
    try {
      const res = await likeOrDislikeRecruitmentCommentUsingPost({ id: commentId })
      if (res.code === 0 && res.data) {
        setHasLike(res.data === 1);
        setLikeNum(res.data === 1 ? likeNum + 1 : likeNum - 1)
      }
    } catch (error: any) {
      message.error(error.message);
    }
  }

  return (
    <div className="recruitment-comment-card">
      <Card>
        <Meta
          title={
            <Flex justify="space-between" align="center">
              <Flex gap={10}>
                <Avatar src={commentVO.publisherInfo?.userAvatar} />
                <span className="recruitment-comment-card-username">{commentVO.publisherInfo?.userName}</span>
              </Flex>
              <Rate disabled defaultValue={5} />
            </Flex>
          }
          description={<span className="recruitment-comment-card-text">{commentVO.commentText}</span>}
          style={{ marginBottom: 13 }}
        />
        <Flex justify="space-between">
          <Flex gap="small" align="center">
            {hasLike ?
              <LikeFilled onClick={async () => likeComment(commentVO.id ?? 0)} style={{ color: '#fadb15' }} /> :
              <LikeOutlined onClick={async () => likeComment(commentVO.id ?? 0)} />}
            <span>{likeNum}</span>
          </Flex>
          <span className="recruitment-comment-card-time">{formatDate(commentVO.createTime ?? '')}</span>
        </Flex>
      </Card>
    </div>

  )
}

export default RecruitmentCommentCard;
