import React from "react";
import './positionIndex.less'
import { ReconciliationFilled } from "@ant-design/icons";
import { Flex, Space } from "antd";
import { history } from "@umijs/max";

const RankPositionCard: React.FC = () => {
  return (
    <div className="e-card playing">
      <div className="image"></div>

      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>


      <div onClick={() => history.push("/rank/career")} className="infotop">
        <Flex vertical align='center' gap={20}>
          <span style={{ fontSize: 18, fontWeight: "bolder" }}>热门职业 <ReconciliationFilled /></span>
          <div>
            <Space size={22} align="start" direction='vertical' style={{ fontSize: '14', fontWeight: 900 }}>
              <Flex align="center">
                <img src="/medal/medal_1.svg" alt="medal_1" />
                <span style={{ marginLeft: 10, fontSize: 15 }}>后端工程师</span>
              </Flex>
              <Flex align="center">
                <img src="/medal/medal_2.svg" alt="medal_2" />
                <span style={{ marginLeft: 10, fontSize: 15 }}>前端工程师</span>
              </Flex>
              <Flex align="center">
                <img src="/medal/medal_3.svg" alt="medal_3" />
                <span style={{ marginLeft: 10, fontSize: 15 }}>搬运工</span>
              </Flex>
            </Space>
          </div>
        </Flex>

        <div className="name"></div>
      </div>
    </div>
  )
}

export default RankPositionCard;
