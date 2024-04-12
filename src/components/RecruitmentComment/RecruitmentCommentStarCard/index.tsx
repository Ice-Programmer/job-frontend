import { ConfigProvider, Flex, Progress, Rate } from "antd";
import './index.less'
import React from "react";

interface Props {
  recruitmentId: number
}

const RecruitmentCommentStarCard: React.FC<Props> = (props) => {
  const { recruitmentId } = props
  return (
    <ConfigProvider
      theme={{
        token: {
          /* 这里是你的全局 token */
          fontSize: 1
        },
      }}>
      <Flex gap="large" className="recruitment-comment-star-info" justify="space-between" align="center">
        <Flex vertical align="center">
          <span className="recruitment-comment-star-total">3.9</span>
          <span className="recruitment-comment-star-num"><span style={{fontWeight: "bolder"}}>855</span>人评分</span>
        </Flex>
        <Flex vertical style={{ width: '100%' }} gap={5}>
          <Flex gap="middle">
            <Rate disabled defaultValue={5} />
            <Progress strokeColor={"#fadb15"} percent={70} showInfo={false} />
          </Flex>
          <Flex gap="middle">
            <Rate disabled defaultValue={4} />
            <Progress strokeColor={"#fadb15"} percent={70} showInfo={false} />
          </Flex>
          <Flex gap="middle">
            <Rate disabled defaultValue={3} />
            <Progress strokeColor={"#fadb15"} percent={70} showInfo={false} />
          </Flex>
          <Flex gap="middle">
            <Rate disabled defaultValue={2} />
            <Progress strokeColor={"#fadb15"} percent={70} showInfo={false} />
          </Flex>
          <Flex gap="middle">
            <Rate disabled defaultValue={1} />
            <Progress strokeColor={"#fadb15"} percent={70} showInfo={false} />
          </Flex>
        </Flex>
      </Flex>
    </ConfigProvider>
  )
}

export default RecruitmentCommentStarCard;
