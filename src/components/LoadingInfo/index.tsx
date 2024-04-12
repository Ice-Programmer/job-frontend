import { Result, Spin } from "antd";
import React from "react";

const LoadingInfo: React.FC = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      fontWeight: "bolder"
    }}>
      <Result
        icon={<Spin size="large" />}
        title="正在加载中，请稍等哟"
      />
    </div>

  )
}

export default LoadingInfo;
