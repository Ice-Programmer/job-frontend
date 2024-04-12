import React from "react";
import { Avatar, Card, Flex } from "antd";
import { EllipsisOutlined, FilePdfTwoTone } from "@ant-design/icons";

const { Meta } = Card;
const EmployeeBiographyCard: React.FC = () => {
  return (
    <>
      <Card hoverable>
        <Meta
          avatar={<Avatar size={50} style={{ fontSize: 35 }} shape="square" src={<FilePdfTwoTone />} />}
          title={
            <Flex justify='space-between' align="center">
              <Flex style={{ width: '100%' }} gap={5} vertical>
                <span style={{ fontSize: 16 }}>陈嘉翰-后端开发简历.pdf</span>
                <Flex
                  style={{
                    fontSize: 12,
                    fontWeight: "bolder",
                    color: '#A1A1A1'
                  }}
                  justify="space-between"
                  align="center"
                >
                  <span>
                  {/*{`${recruitmentVO.companyInfo?.companyName} | ${recruitmentVO.employerInfo?.positionName}`}*/}
                    更新于 2024.03.28
                  </span>
                  <EllipsisOutlined style={{ fontSize: 20 }} />
                </Flex>
              </Flex>
            </Flex>
          }
        />
      </Card>
    </>
  )
}

export default EmployeeBiographyCard;
