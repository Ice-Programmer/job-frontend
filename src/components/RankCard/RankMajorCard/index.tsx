import React from "react";
import './majorIndex.less'
import { ExperimentFilled, ReconciliationFilled } from "@ant-design/icons";
import { Flex } from "antd";
import { history } from "@umijs/max";

const RankMajorCard: React.FC = () => {
  return (
    <div className="e-card-major playing-major">
      <div className="image-major"></div>

      <div className="wave-major"></div>
      <div className="wave-major"></div>
      <div className="wave-major"></div>

      <div onClick={() => history.push("/rank/major")} className="infotop-major">
        <Flex style={{marginTop: 10}} gap="small" vertical>
          <span style={{ fontSize: 16, fontWeight: "bolder" }}>热门专业 <ExperimentFilled /></span>
          <span style={{ fontSize: 14, fontWeight: 'bolder' }}>计算机科学与技术...</span>
        </Flex>
      </div>
    </div>
  )
}

export default RankMajorCard;
