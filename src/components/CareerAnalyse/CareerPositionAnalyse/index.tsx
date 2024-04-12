import React, { useEffect, useState } from "react";
import { List, message } from "antd";
import { pageRecruitmentUsingPost } from "@/services/backend/recruitmentController";
import EmptyInfo from "@/components/EmptyInfo";
import RecruitmentInfoCard from "@/components/RecruitmentInfoCard";

const CareerPositionAnalyse: React.FC = () => {
  const [recruitmentList, setRecruitmentList] = useState<API.RecruitmentVO[]>();
  const [recruitmentLoading, setRecruitmentLoading] = useState<boolean>(false)

  const getPositionList = async () => {
    setRecruitmentLoading(true)
    try {
      const recruitmentQueryRequest: API.RecruitmentQueryRequest = {
        positionId: 1
      }
      const res = await pageRecruitmentUsingPost(recruitmentQueryRequest);
      if (res.code === 0 && res.data) {
        if (res.data.records) {
          setRecruitmentList(res.data.records)
        }
      }
    } catch (error: any) {
      message.error(error.message)
    } finally {
      setRecruitmentLoading(false)
    }
  }

  useEffect(() => {
    getPositionList().then()
  }, [])
  return (
    <>
      <span style={{ fontSize: 16, fontWeight: "bolder" }}>相关职位推荐</span>

      {recruitmentList ?
        <List
          itemLayout="vertical"
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
    </>
  )
}
export default CareerPositionAnalyse;
