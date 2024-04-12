import React, { useEffect, useState } from "react";
import './index.less'
import { history, useParams } from '@umijs/max';
import { Avatar, Button, ConfigProvider, Flex, message, Tabs } from "antd";
import { getRecruitmentUsingGet } from "@/services/backend/recruitmentController";
import { HeartOutlined, LeftOutlined } from "@ant-design/icons";
import type { TabsProps } from 'antd';
import RecruitmentDescription from "@/components/RecruitmentDescription";
import RecruitmentCommentInfo from "@/components/RecruitmentComment/RecruitmentCommentInfo";


const RecruitmentInfo: React.FC = () => {
  const [recruitmentInfo, setRecruitmentInfo] = useState<API.RecruitmentVO>();
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();


  const items: TabsProps['items'] = [
    {
      key: 'description',
      label: '描述',
      children: recruitmentInfo ? <RecruitmentDescription recruitmentVO={recruitmentInfo} /> : null,
    },
    {
      key: 'comment',
      label: '评价',
      children: <RecruitmentCommentInfo recruitmentId={recruitmentInfo?.id ?? 0} />,
    },
  ];

  /**
   * 获取求职信息
   */
  const getRecruitmentInfo = async () => {
    setLoading(true);
    try {
      if (params.recruitmentId) {
        const recruitmentId = params.recruitmentId;
        // @ts-ignore
        const res = await getRecruitmentUsingGet({ recruitmentId })
        if (res.code === 0) {
          setRecruitmentInfo(res.data);
        }
      }
    } catch (error: any) {
      message.error(error.message)
      console.log(error)
    }
    setLoading(false);
  }

  useEffect(() => {
    getRecruitmentInfo().then();
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#47C8CB",
        },
        components: {
          Tabs: {
            horizontalItemGutter: 100
          }
        }
      }}
    >
      <div className="recruitment-page-background">
        <div className="recruitment-info-header">
          <div className="recruitment-basic-info">
            <div className="back-button" onClick={() => {
              history.go(-1);
            }}>
              <LeftOutlined />
            </div>
            <Flex vertical align='center' style={{ width: '100%' }}>
              <Avatar className="recruitment-company-logo" src={recruitmentInfo?.companyInfo?.companyLogo} />
              <span className="recruitment-job-name">{recruitmentInfo?.jobName}</span>
              <span className="recruitment-company-name">{recruitmentInfo?.companyInfo?.companyName}</span>
              <Flex style={{ marginTop: 13 }} gap='middle'>
                {recruitmentInfo?.jobKeywords?.map((keyword) => (
                  <Button size="small" disabled style={{ color: "white", backgroundColor: '#4DBCBE', border: 0 }}
                          shape="round" key={keyword}>
                    {keyword}
                  </Button>
                ))}
              </Flex>
              <Flex style={{ width: '100%', marginTop: 26 }} justify="space-around">
                {
                  recruitmentInfo?.salaryLower && recruitmentInfo?.salaryUpper ?
                    <span style={{
                      fontSize: 16,
                      fontWeight: "bolder",
                      color: "white"
                    }}>{recruitmentInfo.salaryLower / 1000}k-{recruitmentInfo.salaryUpper / 1000}k/{recruitmentInfo.salaryUnit === 0 ? '日' : '月'}</span> :
                    null
                }
                <span style={{
                  fontSize: 16,
                  fontWeight: "bolder",
                  color: "white"
                }}>{recruitmentInfo?.cityAddress}</span>
              </Flex>
            </Flex>
          </div>
        </div>
        <div className="recruitment-info-content">
          <Tabs centered defaultActiveKey="description" items={items} />
        </div>
        <div className="recruitment-info-bottom">
          <Flex gap='middle' style={{ width: '100%', margin: '0 20px' }}>
            <Button className="recruitment-favour-button"><HeartOutlined /></Button>
            <Button className="recruitment-chat-button" type="primary" block>立即沟通</Button>
          </Flex>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default RecruitmentInfo;
