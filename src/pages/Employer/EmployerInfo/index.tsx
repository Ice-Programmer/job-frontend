import React, { useEffect, useState } from "react";
import './index.less';
import { Avatar, Card, ConfigProvider, Flex, Image, List, message, Space } from "antd";
import { history, useParams } from "@@/exports";
import { getEmployerByIdUsingGet } from "@/services/backend/employerController";
import { LeftOutlined, MailOutlined, PhoneOutlined, RightOutlined } from "@ant-design/icons";
import { getCompanyUsingGet } from "@/services/backend/companyController";
import RecruitmentInfoCard from "@/components/RecruitmentInfoCard";
import EmptyInfo from "@/components/EmptyInfo";
import { pageRecruitmentUsingPost } from "@/services/backend/recruitmentController";

const { Meta } = Card;
const EmployerInfo: React.FC = () => {
  const [employerVO, setEmployerVO] = useState<API.EmployerVO>();
  const [recruitmentList, setRecruitmentList] = useState<API.RecruitmentVO[]>();
  const [recruitmentLoading, setRecruitmentLoading] = useState<boolean>(false);
  const [companyVO, setCompanyVO] = useState<API.CompanyVO>();
  const params = useParams();

  /**
   * 获取招聘者信息
   */
  const getEmployerInfo = async () => {
    try {
      if (params.userId) {
        const userId = params.userId;
        // @ts-ignore
        const res = await getEmployerByIdUsingGet({ userId })
        if (res.code === 0 && res.data) {
          setEmployerVO(res.data);

          // 获取公司信息
          try {
            const companyRes = await getCompanyUsingGet({ companyId: res.data.companyId ?? 0 })
            if (companyRes.code === 0) {
              setCompanyVO(companyRes.data)
            }
          } catch (error: any) {
            message.error(error.message)
            console.log(error)
          }

          // 获取公司所有岗位
          try {
            const recruitmentQueryRequest: API.RecruitmentQueryRequest = {
              companyId: res.data.companyId ?? 0
            }
            const recruitmentRes = await pageRecruitmentUsingPost(recruitmentQueryRequest);
            if (recruitmentRes.code === 0 && recruitmentRes.data) {
              setRecruitmentList(recruitmentRes.data.records)
            }
          } catch (error: any) {
            message.error(error.message)
            console.log(error)
          }

        }
      }
    } catch (error: any) {
      message.error(error.message)
      console.log(error)
    }
  }


  useEffect(() => {
    getEmployerInfo().then();
  }, [])


  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            /* 这里是你的全局 token */
            paddingLG: 15
          },
        }}
      >
        {
          employerVO ?
            <div className="employer-page-background">
              <img className="employer-background" alt="employer_background" src="/employer/employer_background.jpg" />
              <div className="employer-back-button" onClick={() => {
                history.go(-1);
              }}>
                <LeftOutlined />
              </div>
              <div className="employer-info">
                <Flex gap="large" vertical>
                  <Flex className="employer-avatar" gap={0} vertical>
                    <Avatar size={120} src={employerVO?.userAvatar} />
                    <span className="employer-name">{employerVO.userName}</span>
                    <span
                      className="employer-position-name">{`${employerVO.companyName}${employerVO.positionName}`}</span>
                  </Flex>
                  <Card hoverable>
                    <Flex vertical gap={8}>
                      {
                        employerVO.email ?
                          <Flex justify="space-between">
                            <Space style={{ fontWeight: "bolder" }} size={10}>
                              <MailOutlined />
                              <span>邮箱</span>
                            </Space>
                            <span className="employer-contract-item">{employerVO.email}</span>
                          </Flex>
                          : null
                      }
                      {
                        employerVO.userPhone ?
                          <Flex justify="space-between">
                            <Space style={{ fontWeight: "bolder" }} size={10}>
                              <PhoneOutlined />
                              <span>电话</span>
                            </Space>
                            <span className="employer-contract-item">{employerVO.userPhone}</span>
                          </Flex>
                          : null
                      }
                    </Flex>
                  </Card>
                  <Flex vertical gap={15}>
                    <span className="employer-title">任职企业</span>
                    <Card style={{ paddingLeft: 10 }} hoverable>
                      <Meta
                        avatar={<Avatar src={companyVO?.companyLogo} size={58} />}
                        title={
                          <Flex justify="space-between" align='center'>
                            <Flex style={{ marginTop: 4 }} vertical gap={3}>
                              <span style={{ fontSize: 15 }}>{companyVO?.companyName}</span>
                              <span style={{ fontSize: 11, color: '#9F9F9F' }}>{companyVO?.companyIndustryName}</span>
                            </Flex>
                            <RightOutlined onClick={() => {
                              history.push(`/job/recruitment/info/company/${companyVO?.id}`)
                            }} />
                          </Flex>

                        }
                      />
                      <Space className="employer-company-image-wall">
                        {companyVO?.companyImgList?.map((companyImg, index) => (
                          <Image width={127} height={93} key={index} src={companyImg} />
                        ))}
                      </Space>
                    </Card>
                  </Flex>
                  <Flex vertical gap={1}>
                    <span className="employer-title">发布岗位</span>
                    {recruitmentList ?
                      <List
                        dataSource={recruitmentList}
                        loading={recruitmentLoading}
                        split={false}
                        renderItem={(recruitmentVO: API.RecruitmentVO) => (
                          <List.Item>
                            <RecruitmentInfoCard key={recruitmentVO.id} recruitmentInfo={recruitmentVO} />
                          </List.Item>
                        )}
                      /> :
                      <EmptyInfo />}
                  </Flex>
                </Flex>
              </div>
            </div> :
            null
        }
      </ConfigProvider>

    </>
  )
}

export default EmployerInfo;
