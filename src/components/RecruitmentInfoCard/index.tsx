import { Avatar, Badge, Card, ConfigProvider, Flex, Space, Tag, Typography } from "antd";
import React from "react";
import { JobTypeEnum } from "@/constants/JobTypeEnum";
import './index.less'
import { history } from "@umijs/max";

const { Meta } = Card;
const { Text } = Typography;

interface Props {
  recruitmentInfo: API.RecruitmentVO
}

const RecruitmentInfoCard: React.FC<Props> = (props) => {
  const { recruitmentInfo } = props;
  let ellipsis = true

  let jobType: any = JobTypeEnum[(recruitmentInfo.jobType ?? 6) - 1]

  function getDaysDiffFromToday(givenDateStr: string) {
    // 获取当前日期
    const currentDate = new Date();

    // 创建给定日期
    const givenDate = new Date(givenDateStr);

    // 计算时间差
    const timeDiff = currentDate.getTime() - givenDate.getTime();

    // 将时间差转换为天数
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return `${diffDays}天前发布`;
  }

  return (
    <div className="recruitment-card" style={{ width: '100%' }}>
      {recruitmentInfo ? <ConfigProvider
        theme={{
          token: {
            padding: 1
          },
        }}
      >
        <Badge.Ribbon text={jobType.name} color={jobType.color}>
          <Card hoverable onClick={() => {
            history.push(`/job/recruitment/${recruitmentInfo.id}`);

          }}>
            <Meta
              style={{ marginBottom: 8 }}
              avatar={<Avatar size={50} src={recruitmentInfo?.companyInfo?.companyLogo} />}
              title={
                <div style={{ marginLeft: 5 }}>
                  <Flex vertical>
                    <Space>
                      <Text style={ellipsis ? { width: 160 } : undefined} ellipsis={ellipsis}>
                        <span style={{ fontSize: 12, fontWeight: "bolder" }}>{recruitmentInfo.jobName}</span>
                      </Text>
                      {
                        recruitmentInfo.salaryLower && recruitmentInfo.salaryUpper ?
                          <span style={{
                            fontSize: 14,
                            fontWeight: "bolder",
                            color: "#47C8CB"
                          }}>{recruitmentInfo.salaryLower / 1000}k-{recruitmentInfo.salaryUpper / 1000}k/{recruitmentInfo.salaryUnit === 0 ? '日' : '月'}</span> :
                          null
                      }
                    </Space>
                    <Text style={ellipsis ? { width: 200 } : undefined} ellipsis={ellipsis}>
                <span style={{
                  fontSize: 10,
                  fontWeight: "bolder",
                  color: '#5C5775',
                }}>
                  {recruitmentInfo.companyInfo?.companyName}，{recruitmentInfo.jobAddress}
                </span>
                    </Text>
                  </Flex>
                </div>
              }
            />
            {recruitmentInfo.jobKeywords?.map((jobKeyWord: string) => (
              <Tag key={jobKeyWord}>{jobKeyWord}</Tag>
            ))}
            <div style={{ marginTop: 8, fontSize: 10, fontWeight: "bolder" }}>
              <Space align='center'>
                <Avatar size={20} src={recruitmentInfo.employerInfo?.userAvatar} />
                <span>{recruitmentInfo.employerInfo?.userName}·{recruitmentInfo.employerInfo?.positionName}</span>
                {
                  recruitmentInfo.employerInfo?.lastLogin ?
                    recruitmentInfo.employerInfo.lastLogin < 5 ?
                      <span style={{ color: "#47C8CB" }}>近期活跃</span> :
                      <span style={{ color: "#95969D" }}>5天前在线</span> : null
                }
              </Space>
              {
                recruitmentInfo.createTime ?
                  <span style={{
                    float: "right",
                    color: '#D9D9D9',
                    marginTop: 2
                  }}>{getDaysDiffFromToday(recruitmentInfo.createTime)}</span> :
                  null
              }
            </div>
          </Card>
        </Badge.Ribbon>
      </ConfigProvider> : null}
    </div>
  )
}

export default RecruitmentInfoCard;
