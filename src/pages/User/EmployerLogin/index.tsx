import React from "react";
import { Button } from "antd-mobile";
import { LeftOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { history } from "@umijs/max";
import { IconFont } from "@/components/IconFont";
import LoginFormComponent from "@/components/LoginFormComponent";

const { Title } = Typography;

const EmployeeLogin: React.FC = () => {
  return (
    <div className="login" style={{ height: "100%", }}>
      <Button
        style={{
          float: "right",
          marginTop: "5%",
          marginRight: "9%",
          "--border-radius": "10px",
          backgroundColor: "#79AEF5",
          color: "white",
          fontSize: 14,
          width: "28%"
        }}
        onClick={() => {
          history.push("/user/employee/login")
        }}
      >
        <IconFont type="icon-centericjob" /> 我要找工作
      </Button>
      <Button
        shape="rounded"
        style={{
          width: 50,
          height: 50,
          position: "absolute",
          top: "10%",
          left: "8%"
        }}
        onClick={() => {
          history.push("/welcome/user")
        }}
      >
        <LeftOutlined />
      </Button>

      <div style={{ textAlign: "center" }}>
        <img src="/login/employer_login.svg" style={{ width: "66.7%", marginTop: "8%" }} alt="employee_login" />
      </div>
      <Title style={{ textAlign: "center", fontWeight: "bolder", fontSize: "30px", color: "#0D0140" }}
             level={2}>HR，精准招才</Title>
      <LoginFormComponent userRole="employer" />
    </div>
  )
}

export default EmployeeLogin;
