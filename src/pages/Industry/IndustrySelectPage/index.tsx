import React, { useEffect, useState } from "react";
import { Button, Card, ConfigProvider, Flex, Layout, Menu, MenuProps, message, Radio, Select } from "antd";
import './index.less'
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Dialog } from "antd-mobile";
import { history } from "@@/core/history";
import LoadingInfo from "@/components/LoadingInfo";
import { useSearchParams } from "react-router-dom";
import { getIndustryListUsingGet } from "@/services/backend/industryController";


const { Header, Sider, Content } = Layout;


const IndustrySelectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  let positionIdStr = searchParams.get("positionId")
  let positionNameStr = searchParams.get("positionName")
  let industryIdStr = searchParams.get("industryId")
  let industryNameStr = searchParams.get("industryName")
  const [industryType, setIndustryType] = useState<number>(1);
  const [industryId, setIndustryId] = useState<number | undefined>(positionIdStr ? parseInt(positionIdStr) : undefined);
  const [industryName, setIndustryName] = useState<string | undefined>(positionNameStr || undefined);
  const [industryVOList, setIndustryVOList] = useState<API.CareerIndustryVO[]>()

  /**
   * 获取职业列表
   */
  const getIndustryList = async () => {
    try {
      const res = await getIndustryListUsingGet();
      if (res.code === 0 && res.data) {
        setIndustryVOList(res.data)
      }
    } catch (error: any) {
      message.error(error.message);
    }
  }


  const items: MenuProps['items'] = industryVOList?.map((careerIndustryVO) => {
    return {
      label: careerIndustryVO.industryType || '',
      key: careerIndustryVO.id || 0
    }
  })

  const handleEnter = () => {
    const routePath = `/user/employee/career/add${
      positionIdStr && positionNameStr ? `?positionId=${parseInt(positionIdStr)}&positionName=${positionNameStr}` : ""
    }${
      (positionIdStr && positionNameStr) && (industryId && industryName) ? "&" : ""
    }${
      // todo 应当传递多个industryId值
      industryId && industryName ? `industryId=${industryId}&industryName=${industryName}` : ""
    }`;
    history.push(routePath)
  }

  useEffect(() => {
    getIndustryList().then()
  }, [])

  return (
    industryVOList ?
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              headerPadding: '0 20px'
            }
          },
          token: {
            colorPrimary: '#47C8CB',
          }
        }}
      >
        <Layout className="career-cascader-select">
          <Header className="career-cascader-select-header">
            <Flex gap="large" justify="space-between" style={{ width: '100%' }}>
              <LeftOutlined style={{ fontSize: 20 }} onClick={() => history.go(-1)} />
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="搜索职业名称"
                optionFilterProp="children"
                onChange={(value: number, option: any) => {
                  setIndustryId(value)
                  // setPositionName(option)
                  setIndustryName(option.label)
                }}
                options={industryVOList?.map((industryVO) => {
                  return {
                    label: <span>{industryVO.industryType}</span>,
                    title: industryVO.industryType,
                    options: industryVO.industryInfoList?.map((industry) =>
                      ({ label: industry.industryName, value: industry.id }))
                  }
                })}
              />

            </Flex>
          </Header>
          <Layout>
            <Sider width="35%">
              <Menu
                style={{ height: '90vh', overflow: 'auto' }}
                theme="dark"
                defaultSelectedKeys={['1']}
                onClick={(value) => setIndustryType(parseInt(value.key))}
                items={items}
              />
            </Sider>
            <Content style={{ width: '100%', height: '90vh', overflow: 'auto' }}>
              <Radio.Group name="gender" value={industryId}>
                {
                  industryVOList[industryType - 1] ?
                    industryVOList[industryType - 1].industryInfoList?.map((industry) =>
                      <Card
                        onClick={() => {
                          setIndustryId(industry.id)
                          setIndustryName(industry.industryName ?? '')
                        }}
                        key={industry.id}
                        size="small"
                        style={{ margin: 10, width: '100%' }}
                        hoverable
                      >
                        <Card.Meta
                          title={
                            <Radio value={industry.id}>{industry.industryName}</Radio>
                          }
                        />
                      </Card>
                    ) :
                    null
                }
              </Radio.Group>
            </Content>
          </Layout>
          <div className="career-cascader-select-footer">
            <Flex gap='middle' justify="space-between" align="center" style={{ width: '100%', margin: '0 20px' }}>
              <Flex vertical gap="small">
                <span className="career-cascader-select-content">我选择的职业：</span>
                <span className="career-cascader-select-career">{industryName}</span>
              </Flex>
              <Button className="career-cascader-select-button" type="primary" block
                      onClick={handleEnter}>确认选择</Button>
            </Flex>
          </div>
        </Layout>
      </ConfigProvider> :
      <LoadingInfo />
  )
}

export default IndustrySelectPage
