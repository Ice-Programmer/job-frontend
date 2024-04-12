import React, { useEffect, useState } from "react";
import { Avatar, ConfigProvider, Flex, Image, List, message, Space, Typography } from "antd";
import { useParams } from "@@/exports";
import { getCompanyUsingGet } from "@/services/backend/companyController";
import { pageRecruitmentUsingPost } from "@/services/backend/recruitmentController";
import './index.less';
import MapContainer from "@/components/MapContainer";
import { LeftOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { pageEmployerUsingPost } from "@/services/backend/employerController";
import RecruitmentInfoCard from "@/components/RecruitmentInfoCard";
import EmptyInfo from "@/components/EmptyInfo";

const { Paragraph } = Typography;
const CompanyInfo: React.FC = () => {
  const params = useParams();
  const [companyVO, setCompanyVO] = useState<API.CompanyVO>();
  const [recruitmentList, setRecruitmentList] = useState<API.RecruitmentVO[]>();
  const [employerList, setEmployerList] = useState<API.EmployerVO[]>();

  /**
   * 获取公司信息
   */
  const getCompanyInfo = async () => {
    try {
      if (params.companyId) {
        const companyId = params.companyId;
        // @ts-ignore
        const res = await getCompanyUsingGet({ companyId })
        if (res.code === 0 && res.data) {
          setCompanyVO(res.data);

          // 获取公司所有岗位
          try {
            const recruitmentQueryRequest: API.RecruitmentQueryRequest = {
              companyId: res.data.id ?? 0
            }
            const recruitmentRes = await pageRecruitmentUsingPost(recruitmentQueryRequest);
            if (recruitmentRes.code === 0 && recruitmentRes.data) {
              setRecruitmentList(recruitmentRes.data.records)
            }
          } catch (error: any) {
            message.error(error.message)
            console.log(error)
          }

          // 获取招募达人
          try {
            const employerQueryRequest: API.EmployerQueryRequest = {
              companyId: res.data.id ?? 0,
              pageSize: 5
            }
            const employerRes = await pageEmployerUsingPost(employerQueryRequest);
            if (employerRes.code === 0 && employerRes.data) {
              setEmployerList(employerRes.data.records)
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
    getCompanyInfo().then();
  }, []);

  return (
    <>
      {
        companyVO ? <div className="company-body">
          <ConfigProvider
            theme={{
              token: {
                /* 这里是你的全局 token */
                paddingLG: 15
              },
            }}
          >
            <img className="company-background-image" alt="company-background-image" src={companyVO?.backgroundImage} />
            <LeftOutlined className="company-back-arrow" onClick={() => {
              history.go(-1)
            }} />
            <Flex gap="middle" className="company-logo">
              <Avatar size={68} shape={"circle"} src={companyVO?.companyLogo} />
              <Flex vertical justify="space-around">
                <span className="company-name">{companyVO?.companyName}</span>
                <span className="company-industry-name">{companyVO?.companyIndustryName}</span>
              </Flex>
            </Flex>
            <Flex className="company-description-info" gap="middle" vertical>
              <Flex gap={14} vertical>
                <span className="company-title">公司简介</span>
                <Paragraph ellipsis={{
                  rows: 5,
                  expandable: true,
                  symbol: '展开全部'
                }}>
                  {companyVO?.companyDescript}
                </Paragraph>
              </Flex>
              <Flex vertical>
                <span className="company-title">公司风貌</span>
                <Space className="company-image-wall">
                  {companyVO?.companyImgList?.map((companyImg, index) => (
                    <Image style={{ borderRadius: 6 }} width={158} height={115} key={index} src={companyImg} />
                  ))}
                </Space>
              </Flex>
              <Flex gap={10} vertical>
                <span className="company-title">公司地址</span>
                <span className="company-address">{companyVO?.companyAddress}</span>
                <MapContainer
                  coordinateX={companyVO.coordinateX ?? 0}
                  coordinateY={companyVO.coordinateY ?? 0}
                  name={companyVO?.companyName ?? ''}
                />
              </Flex>
              <Flex vertical>
                <span className="company-title">招募达人</span>
                <Space size="middle" className="company-image-wall">
                  {
                    employerList?.map((employer) => (
                      <Flex gap="small" key={employer.userId}>
                        <Avatar size={41} shape={"circle"} src={employer.userAvatar} />
                        <Flex vertical justify="space-around">
                          <span className="company-employer-name">{employer.userName}</span>
                          <span className="company-employer-position-name">{employer.positionName}</span>
                        </Flex>
                      </Flex>
                    ))
                  }
                </Space>
              </Flex>
              <Flex gap={10} vertical>
                <span className="company-title">相关岗位</span>
                {recruitmentList ?
                  <List
                    dataSource={recruitmentList}
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
          </ConfigProvider>
        </div> : null
      }
    </>
  )
}

export default CompanyInfo;
