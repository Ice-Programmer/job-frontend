import React from "react";
import './index.less'
import { HomeFilled, LeftOutlined, QuestionCircleOutlined, ShareAltOutlined } from "@ant-design/icons";
import { history } from "@@/core/history";
import { Badge, Card, ConfigProvider, Flex, Tabs, TabsProps, Tag } from "antd";
import CareerSalaryAnalyse from "@/components/CareerAnalyse/CareerSalaryAnalyse";
import CareerSkillAnalyse from "@/components/CareerAnalyse/CareerSkillAnalyse";
import CareerPositionAnalyse from "@/components/CareerAnalyse/CareerPositionAnalyse";

const items: TabsProps['items'] = [
  {
    key: 'salary',
    label: '薪资分析',
    children: <CareerSalaryAnalyse />,
  },
  {
    key: 'skill',
    label: '技能分析',
    children: <CareerSkillAnalyse />,
  },
  {
    key: 'position',
    label: '职位推荐',
    children: <CareerPositionAnalyse />,
  },
];
const CareerDetailPage: React.FC = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#47C8CB'
          }
        }}
      >
      <div className="gradient-background" />
      <Flex gap="middle" className="career-detail-header" vertical>
        <Flex align="center" justify="space-between">
          <LeftOutlined className="career-detail-back-button" onClick={() => history.go(-1)} />
          <Flex gap="large" className="career-detail-share-button">
            <ShareAltOutlined />
            <QuestionCircleOutlined />
          </Flex>
        </Flex>
        <span className="career-detail-career-name">后端工程师</span>
        <Badge.Ribbon text="击败 78% 其他行业" color="volcano">
          <Card>
            <Card.Meta
              title={
                <Flex>
                  <Flex align="baseline">
                    <span>平均月薪：</span>
                    <span style={{ color: '#47C8CB', fontSize: 22 }}>¥14470</span>
                  </Flex>
                </Flex>
              }
              description={<span>热门城市<HomeFilled />：上海、杭州、深圳...</span>}
            />
          </Card>
        </Badge.Ribbon>
        <Tabs
          size="small"
          tabBarGutter={60}
          centered
          items={items}
        />
      </Flex>

      </ConfigProvider>
    </>
  )
}

export default CareerDetailPage;
