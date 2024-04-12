import React, { useEffect } from "react";
import { Space } from "antd";
import { history } from '@umijs/max';

const Welcome: React.FC = () => {

  useEffect(() => {

    const timer = setTimeout(() => {
      history.push('/welcome/user');
    }, 2500); // 5秒后跳转
    return () => clearTimeout(timer);

  }, [history])

  return (
    <div style={{
      background: "#47C8CB",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      overflow: "hidden"
    }}>
      <Space direction="vertical" align="center" size={1}>
        <img src="/logo.svg" alt="Logo" />
        <span style={{ color: "white", fontWeight: "bold", fontSize: "26px" }}>SparkHire</span>
      </Space>

    </div>
  )
}

export default Welcome;
