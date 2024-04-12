import React, { useEffect, useState } from "react";
import { Avatar, Badge, Button, Card, ConfigProvider, Flex, message, Tag, Typography } from "antd";
import { history } from "@umijs/max";
import { Modal } from "antd-mobile";
import './index.less'
import { getWishPositionUsingPost } from "@/services/backend/employeeWishCareerController";
import LoadingInfo from "@/components/LoadingInfo";
import { SyncOutlined } from "@ant-design/icons";
import CompanyInfo from "@/pages/Company/CompanyInfo";

const { Link } = Typography;

interface Props {
  employeeVO: API.EmployeeVO
}

const { Meta } = Card;

const EmployeeWishCareerInfo: React.FC<Props> = (props) => {
  const { employeeVO } = props
  const [buttonV, setButtonV] = useState(false)
  const [careerModal, setCareerModal] = useState<boolean>(false);
  const [addCareerModal, setAddCareerModal] = useState<boolean>(false)
  const [careerLoading, setCareerLoading] = useState<boolean>(false);
  const [careerList, setCareerList] = useState<string[]>(["后端开发工程师"]);
  const [companyCard, setCompanyCard] = useState(<Card hoverable>
    <Meta
      avatar={<Avatar size={50} shape="square"
                      src={"https://img.bosszhipin.com/beijin/mcs/chatphoto/20190411/86a256972f55254146c59551950105be717ae0fc99bb04e83fb960bb0134be4f.jpg?x-oss-process=image/resize,w_120,limit_0"} />}
      title={
        <Flex justify={'space-between'} align={"center"}>
          <Flex gap={5} vertical>
            <span style={{ fontSize: 16, fontWeight: "bolder" }}>{"华云科技"}</span>
            <span style={{
              fontSize: 14,
              fontWeight: "bolder",
              color: '#A1A1A1'
            }}>{`计算机软件 | 杭州`}</span>
          </Flex>
        </Flex>
      }
    />
  </Card>);

  /**
   * 凭借行业信息
   * @param industryInfoList
   */
  function joinIndustryNames(industryInfoList: API.IndustryVO[]) {
    const industryNames = industryInfoList.map(item => item.industryName);
    return industryNames.join('、');
  }

  const handleAIGetCareer = async () => {
    setCareerModal(true)
    setCareerLoading(true)
    try {
      // const request = "熟悉Spring Boot, MQ, Mybatis, Spring MVC等开源框架，了解Spring cloud, dubbo, zookeeper等分布式框架，熟悉IO流，多线程，jvm和大数据处理相关技术。"

    } catch (error: any) {
      message.error(error.message)
    } finally {
      setCareerLoading(false)
    }
  }


  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            /* 这里是你的全局 token */
            colorPrimary: '#47C8CB',
          },
        }}
      >
        <Flex gap="middle" vertical>
          <Button
            block
            danger
            onClick={() =>
              Modal.alert({
                title: '技能缺失点',
                content: <Flex vertical>
                  <span><span style={{ fontWeight: "bolder" }}>1. 性能调优和优化</span>：了解性能调优和优化的基本原则和方法，能够识别和解决性能瓶颈问题，提高应用程序的性能和响应速度。</span>
                  <span><span style={{ fontWeight: "bolder" }}>2. 大数据处理</span>：掌握如何使用Hadoop、Spark等工具进行大数据处理。</span>
                  <span><span style={{ fontWeight: "bolder" }}>3. 分布式技术</span>：理解和应用分布式系统设计理念，包括微服务架构、消息队列等。</span>
                </Flex>,
                closeOnMaskClick: true,

              })
            }
          >查看 3 处技能不足之处</Button>


          {
            employeeVO.wishCareerInfoList?.map((career) => (
              <Card key={career.id} hoverable>
                <Meta
                  avatar={<Avatar
                    size={50}
                    shape="square"
                    src={"https://ice-man-1316749988.cos.ap-shanghai.myqcloud.com/imgs/Java.svg"}
                  />}
                  title={
                    <Flex justify={'space-between'} align={"center"}>
                      <Flex gap={5} vertical>
                        <span style={{ fontSize: 16, fontWeight: "bolder" }}>{career.positionInfo?.positionName}</span>
                        <span style={{
                          fontSize: 12,
                          fontWeight: "bolder",
                          color: '#A1A1A1'
                        }}>{`${joinIndustryNames(career.industryInfoList ?? [])} | ${career.cityName}`}</span>
                      </Flex>
                      <span style={{ fontSize: 16, fontWeight: "bolder", color: '#47C8CB' }}>
                      {career.salaryExpectation === '-' ? '面议' : `${career.salaryExpectation}k`}
                    </span>
                    </Flex>
                  }
                />
              </Card>
            ))
          }
          <Button
            size="large"
            style={{ color: '#47C8CB', borderColor: '#47C8CB' }}
            type="dashed"
            onClick={() => {
              setAddCareerModal(true)
            }}
          >
            + 添加理想职业
          </Button>
        </Flex>
        <Modal
          visible={careerModal}
          content={
            careerLoading ? <LoadingInfo /> :
              <Flex gap={"middle"} vertical>
                <Flex vertical>
                  <span style={{ fontWeight: "bolder", fontSize: 16 }}>算法推荐岗位：</span>
                  <div>
                    {
                      careerList?.map((career) => (
                        <Button block type="primary" style={{ marginTop: 10 }} size={"large"}
                                key={career}>{career}</Button>
                      ))
                    }
                  </div>
                </Flex>
                <Flex gap={10} vertical>
                  <span style={{ fontWeight: "bolder", fontSize: 16 }}>算法推荐公司：</span>
                  {companyCard}
                </Flex>
              </Flex>
          }
          onClose={() => {
            setCareerModal(false)
          }}
          actions={!careerLoading ? [
            {
              key: "change",
              text: <div style={{ color: '#47C8CB' }}><SyncOutlined spin /> 换一批</div>,
              onClick: () => {
                setCareerList(["Java开发"])
                setCompanyCard(<Card hoverable>
                  <Meta
                    avatar={<Avatar size={50} shape="square"
                                    src={"https://img.bosszhipin.com/beijin/upload/com/workfeel/20240103/7bf6f160950405e94671972cbe984c3672b229d6947ae6ad1f7681560d73fbed9d80c641beb104af.png.webp?x-oss-process=image/resize,w_120,limit_0"} />}
                    title={
                      <Flex justify={'space-between'} align={"center"}>
                        <Flex gap={5} vertical>
                          <span style={{ fontSize: 16, fontWeight: "bolder" }}>{"安恒信息"}</span>
                          <span style={{
                            fontSize: 14,
                            fontWeight: "bolder",
                            color: '#A1A1A1'
                          }}>{`计算机软件 | 杭州`}</span>
                        </Flex>
                      </Flex>
                    }
                  />
                </Card>)
              }
            },
            {
              key: 'confirm',
              text: '我知道了',
              onClick: () => {
                setCareerModal(false)
                setButtonV(true)
              }
            },
          ] : undefined}
        />
        <Modal
          visible={addCareerModal}
          content="请选择添加理想职业方式"
          closeOnMaskClick={true}
          actions={
            [
              {
                key: 'recommend',
                text: '算法推荐职业',
                primary: true,
                onClick: () => {
                  setAddCareerModal(false)
                  setCareerModal(true);
                  handleAIGetCareer().then()
                }
              },
              {
                key: 'self',
                text: <span>自己上传</span>,
                onClick: () => history.push("/user/employee/career/add")
              }
            ]
          }
        />
      </ConfigProvider>
    </div>
  )
}

export default EmployeeWishCareerInfo;
