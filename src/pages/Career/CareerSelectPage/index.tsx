import React, { useEffect, useState } from "react";
import { Button, Card, ConfigProvider, Flex, Layout, Menu, MenuProps, message, Radio, Select } from "antd";
import './index.less'
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Dialog } from "antd-mobile";
import { history } from "@@/core/history";
import { getCareerListUsingGet } from "@/services/backend/positionController";
import LoadingInfo from "@/components/LoadingInfo";
import { useSearchParams } from "react-router-dom";


const { Header, Sider, Content } = Layout;


const CareerSelectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  let positionIdStr = searchParams.get("positionId")
  let positionNameStr = searchParams.get("positionName")
  const [positionType, setPositionType] = useState<number>(1);
  const [positionId, setPositionId] = useState<number | undefined>(positionIdStr ? parseInt(positionIdStr) : undefined);
  const [positionName, setPositionName] = useState<string | undefined>(positionNameStr || undefined);
  const [careerVOList, setCareerVOList] = useState<API.CareerVO[]>()

  /**
   * 获取职业列表
   */
  const getCareerList = async () => {
    try {
      const res = await getCareerListUsingGet();
      if (res.code === 0 && res.data) {
        setCareerVOList(res.data)
      }
    } catch (error: any) {
      message.error(error.message);
    }
  }


  const items: MenuProps['items'] = careerVOList?.map((careerVO) => {
    return {
      label: careerVO.positionType || '',
      key: careerVO.id || 0
    }
  })

  const handleEnter = () => {
    const routePath = positionId && positionName ?
      `/user/employee/career/add?positionId=${positionId}&positionName=${positionName}` :
      '/user/employee/career/add';
    history.push(routePath)
  }

  useEffect(() => {
    getCareerList().then()
  }, [])

  return (
    careerVOList ?
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
                  setPositionId(value)
                  // setPositionName(option)
                  setPositionName(option.label)
                }}
                options={careerVOList?.map((careerVO) => {
                  return {
                    label: <span>{careerVO.positionType}</span>,
                    title: careerVO.positionType,
                    options: careerVO.positionInfoList?.map((position) =>
                      ({ label: position.positionName, value: position.id }))
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
                onClick={(value) => setPositionType(parseInt(value.key))}
                items={items}
              />
            </Sider>
            <Content style={{ width: '100%', height: '90vh', overflow: 'auto' }}>
              <Radio.Group name="gender" value={positionId}>
                {
                  careerVOList[positionType - 1] ?
                    careerVOList[positionType - 1].positionInfoList?.map((position) =>
                      <Card
                        onClick={() => {
                          setPositionId(position.id)
                          setPositionName(position.positionName ?? '')
                        }}
                        key={position.id}
                        size="small"
                        style={{ margin: 10 }}
                        hoverable
                      >
                        <Card.Meta
                          style={{ width: '100%' }}
                          title={
                            <Flex justify="space-between">
                              <Radio checked={position.id === 2} value={position.id}>{position.positionName}</Radio>
                              <RightOutlined
                                onClick={() =>
                                  Dialog.show({
                                    title: position.positionName,
                                    content: position.positionDescript,
                                    closeOnAction: true,
                                    actions: [
                                      [
                                        {
                                          key: 'ok',
                                          text: <span style={{ color: "#47C8CB" }}>我知道了</span>,
                                          bold: true,
                                        },
                                      ],
                                    ],
                                  })}
                                style={{ fontSize: 12 }} />
                            </Flex>
                          }
                          description={
                            <span className="two-line-ellipsis">{position.positionDescript}</span>
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
                <span className="career-cascader-select-career">{positionName}</span>
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

export default CareerSelectPage
