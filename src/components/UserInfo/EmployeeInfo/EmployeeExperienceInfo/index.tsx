import React from "react";
import { Button, Card, ConfigProvider, Divider, Flex, Tag } from "antd";
import './index.less'
import { history } from "@umijs/max";

interface Props {
  employeeVO: API.EmployeeVO
}

const { Meta } = Card;
const educationList = [
  "专科", "本科", "硕士", "博士"
]
const educationColorList = [
  "geekblue", "cyan", "volcano", "red"
]

const experienceList = [
  "项目", "工作", "社团", "学术"
]
const experienceColorList = [
  "cyan", "orange", "purple", "geekblue"
]

const EmployeeExperienceInfo: React.FC<Props> = (props) => {
  const { employeeVO } = props

  return (
    <ConfigProvider
      theme={{
        token: {
          /* 这里是你的全局 token */
          colorPrimary: '#47C8CB',
          marginLG: 0,
        },
      }}
    >
      <div className="employer-experience-info">
        <Flex vertical gap='middle'>
          <Flex gap="small" vertical>
            <span className="employer-experience-title">教育经历</span>
            <Flex gap="middle" vertical>
              {
                employeeVO.employeeEducationList?.map((education) => (
                  <Card
                    key={education.id}
                    hoverable
                    onClick={() => history.push(`/user/employee/education/update/${education.id}`)}
                  >
                    <Meta
                      title={
                        <Flex justify={'space-between'} align={"center"}>
                          <Flex gap={5} vertical>
                            <span style={{ fontSize: 16, fontWeight: "bolder" }}>{education.schoolName}</span>
                            <span style={{
                              fontSize: 12,
                              fontWeight: "bolder",
                              color: '#A1A1A1'
                            }}>{`${education.majorName} | ${education.beginYear}-${education.endYear}`}</span>
                          </Flex>
                          <Tag color={educationColorList[education.educationType ?? 0]}>
                            {educationList[education.educationType ?? 0]}
                          </Tag>
                        </Flex>
                      }
                    />
                  </Card>
                ))
              }
              <Button onClick={() => history.push("/user/employee/education/add")}
                      style={{ color: '#47C8CB', borderColor: '#47C8CB' }} type="dashed">
                + 添加教育经历
              </Button>
              <Divider style={{ border: '1px solid #A1A1A1' }} />
            </Flex>
          </Flex>
          <Flex gap="small" vertical>
            <span className="employer-experience-title">主要经历</span>
            <Flex gap="middle" vertical>
              {
                employeeVO.employeeExperienceList?.map((experience) => (
                  <Card key={experience.id} hoverable>
                    <Meta
                      title={
                        <Flex justify={'space-between'} align={"center"}>
                          <Flex gap={5} vertical>
                            <span style={{
                              fontSize: 16, fontWeight: "bolder", whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              width: '90%'
                            }}>{experience.experienceName}</span>
                            <span style={{
                              fontSize: 12,
                              fontWeight: "bolder",
                              color: '#A1A1A1',
                            }}>{`${experience.jobRole} | ${experience.beginTime}-${experience.endTime}`}</span>
                          </Flex>
                          <Tag color={experienceColorList[experience.experienceType ?? 0]}>
                            {experienceList[experience.experienceType ?? 0]}
                          </Tag>
                        </Flex>
                      }
                    />
                  </Card>
                ))
              }
              <Button style={{ color: '#47C8CB', borderColor: '#47C8CB' }} type="dashed">
                + 添加主要经历
              </Button>
              <Divider style={{ border: '1px solid #A1A1A1' }} />
            </Flex>
          </Flex>
          <Flex gap="small" vertical>
            <span className="employer-experience-title">资格证书</span>
            <Flex gap="middle" wrap={"wrap"}>
              {
                employeeVO.qualificationList?.map((qualification) => (
                  <Button shape="round" type="primary" key={qualification.id}>
                    {qualification.qualificationName}
                  </Button>
                ))
              }
              <Button style={{ color: '#47C8CB', borderColor: '#47C8CB' }} type="dashed">
                + 添加资格证书
              </Button>
            </Flex>
          </Flex>

        </Flex>
      </div>
    </ConfigProvider>
  )
}

export default EmployeeExperienceInfo;
