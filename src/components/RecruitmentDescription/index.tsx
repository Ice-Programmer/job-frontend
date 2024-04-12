import React from "react";
import { Avatar, Button, Card, ConfigProvider, Divider, Flex, Typography } from "antd";

const { Meta } = Card;

const { Paragraph, Link } = Typography;
import './index.less';
import MapContainer from "@/components/MapContainer";
import { history } from "@@/core/history";

interface Props {
  recruitmentVO: API.RecruitmentVO
}

const RecruitmentDescription: React.FC<Props> = (props) => {
  const { recruitmentVO } = props;

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            /* 这里是你的全局 token */
            marginLG: 0
          },
        }}
      >
        <Flex vertical gap={13}>
          <Flex wrap="wrap" gap='middle'>
            {recruitmentVO.jobSkillList?.map((skill) => (
              <Button className='skill-tag' disabled size={"small"} key={skill}>{skill}</Button>
            ))}
          </Flex>
          <Flex vertical gap={6}>
            <span className="recruitment-job-title">职位描述</span>
            <Paragraph ellipsis={{
              rows: 5,
              expandable: true,
              symbol: '展开全部'
            }}>
              {recruitmentVO.jobDescription}
            </Paragraph>
          </Flex>
          <Flex vertical gap={13}>
            <span className="recruitment-job-title">职位要求</span>
            <Paragraph>
              {recruitmentVO.jobRequirements}
            </Paragraph>
          </Flex>
          <Flex vertical gap={13}>
            <span className="recruitment-job-title">位置</span>
            <span style={{ fontSize: 12, color: "#524B6B" }}>{recruitmentVO.jobAddress}</span>
            <MapContainer
              coordinateX={recruitmentVO.coordinateX ?? 0}
              coordinateY={recruitmentVO.coordinateY ?? 0}
              name={recruitmentVO.companyInfo?.companyName ?? ''} />
          </Flex>
          <Flex vertical gap={10}>
            <span className="recruitment-job-title">相关信息</span>
            <span style={{ fontSize: 12, color: "#150B3D", fontWeight: 'bolder' }}>职业名称</span>
            <span style={{ fontSize: 12, color: "#524B6B" }}>{recruitmentVO.positionInfo?.positionName}</span>
            <Divider />
            <span style={{ fontSize: 12, color: "#150B3D", fontWeight: 'bolder' }}>行业名称</span>
            <span style={{ fontSize: 12, color: "#524B6B" }}>{recruitmentVO.industryInfo?.industryName}</span>
            <Divider />
            <span style={{ fontSize: 12, color: "#150B3D", fontWeight: 'bolder' }}>招聘者信息</span>
            <Card hoverable>
              <Meta
                avatar={<Avatar size={50} shape="square" src={recruitmentVO.employerInfo?.userAvatar} />}
                title={
                  <Flex justify={'space-between'} align={"center"}>
                    <Flex gap={5} vertical>
                      <span style={{ fontSize: 16, fontWeight: "bolder" }}>{recruitmentVO.employerInfo?.userName}</span>
                      <span style={{
                        fontSize: 12,
                        fontWeight: "bolder",
                        color: '#A1A1A1'
                      }}>{`${recruitmentVO.companyInfo?.companyName} | ${recruitmentVO.employerInfo?.positionName}`}</span>
                    </Flex>
                    <Link
                      style={{
                        color: "#47C8CB",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                      onClick={() => {
                        history.push(`/job/recruitment/info/employer/${recruitmentVO.employerInfo?.id}`);
                      }}
                    >
                      更多岗位
                    </Link>
                  </Flex>
                }
              />
            </Card>
          </Flex>
        </Flex>
      </ConfigProvider>
    </>
  )
}

export default RecruitmentDescription;
