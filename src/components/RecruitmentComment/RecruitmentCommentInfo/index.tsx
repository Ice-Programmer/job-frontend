import React, { useEffect, useState } from "react";
import { ConfigProvider, Flex, List, message } from "antd";
import RecruitmentCommentStarCard from "@/components/RecruitmentComment/RecruitmentCommentStarCard";
import RecruitmentCommentCard from "@/components/RecruitmentComment/RecruitmentCommentCard";
import { pageRecruitmentCommentUsingPost } from "@/services/backend/recruitmentCommentController";
import EmptyInfo from "@/components/EmptyInfo";

interface Props {
  recruitmentId: number
}

const RecruitmentCommentInfo: React.FC<Props> = (props) => {
  const { recruitmentId } = props
  const [commentList, setCommentList] = useState<API.RecruitmentCommentVO[]>()
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

  const getRecruitmentCommentList = async () => {
    setCommentLoading(true);
    try {
      const commentQueryRequest: API.RecruitmentCommentQueryRequest = {
        recruitmentId: recruitmentId
      }
      const res = await pageRecruitmentCommentUsingPost(commentQueryRequest);
      if (res.code === 0 && res.data) {
        setCommentList(res.data.records);
      } else {
        message.error(res.message);
      }
    } catch (error: any) {
      message.error(error.message);
      console.log(error);
    } finally {
      setCommentLoading(false)
    }
  }

  useEffect(() => {
    getRecruitmentCommentList().then();
  }, [])


  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            List: {
              /* 这里是你的组件 token */
              itemPadding: '5px 0'
            },
          },
          token: {
            borderRadius: 10,
            colorPrimary: '#47C8CB',
          },
        }}
      >
        <Flex vertical gap="large">
          <RecruitmentCommentStarCard recruitmentId={recruitmentId} />
          {commentList ?
            <List
              itemLayout="vertical"
              dataSource={commentList}
              loading={commentLoading}
              split={false}
              renderItem={(commentVO: API.RecruitmentCommentVO) => (
                <List.Item>
                  <RecruitmentCommentCard key={commentVO.recruitmentId} commentVO={commentVO} />
                </List.Item>

              )}
            /> :
            <EmptyInfo />}
        </Flex>
      </ConfigProvider>
    </>
  )
}

export default RecruitmentCommentInfo;
