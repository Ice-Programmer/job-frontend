import React from "react";
import './ciryIndex.less'
import { ExperimentFilled, HomeFilled, ReconciliationFilled } from "@ant-design/icons";
import { Flex } from "antd";
import { history } from "@umijs/max";

const RankMajorCard: React.FC = () => {
  return (
    <div className="e-card-city playing-city">
      <div className="image-city"></div>

      <div className="wave-city"></div>
      <div className="wave-city"></div>
      <div className="wave-city"></div>

      <div onClick={() => history.push("/rank/major")} className="infotop-city">
        <Flex style={{marginTop: 10}} gap="small" vertical>
              <span style={{ fontSize: 16, fontWeight: "bolder" }}>热门城市 <HomeFilled /></span>
              <span style={{ fontSize: 14, fontWeight: 'bolder' }}>杭州、上海、南京...</span>
        </Flex>
      </div>
    </div>
  )
}

export default RankMajorCard;
