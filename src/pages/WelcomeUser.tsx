import React from "react";
import { Carousel, Typography } from 'antd';
import { Button } from "antd-mobile";
import { ArrowRightOutlined } from "@ant-design/icons";
import { history } from "@@/core/history";

const { Link } = Typography;

const contentStyle: React.CSSProperties = {
  height: "75vh",
  width: "90%",
  margin: "auto",
  marginTop: "10%"
};
const WelcomeUser: React.FC = () => {
  return (
    <div style={{ overflow: "hidden", textAlign: "center" }}>
      <Carousel autoplay autoplaySpeed={1000}>
        <div>
          <img style={contentStyle} src="/carousel/carousel_1.svg" alt="carousel_1" />
        </div>
        <div>
          <img style={contentStyle} src="/carousel/carousel_2.svg" alt="carousel_2" />
        </div>
        <div>
          <img style={contentStyle} src="/carousel/carousel_3.svg" alt="carousel_3" />
        </div>
      </Carousel>
      <Button
        size="large"
        block
        shape="rounded"
        style={{
          width: "64%",
          margin: "auto",
          backgroundColor: "#47C8CB",
          color: "white",
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: "4%",
        }}>
        我是新用户 <ArrowRightOutlined />
      </Button>
      <Link
        underline
        style={{
          color: "#47C8CB",
          fontWeight: "bold",
          fontSize: 19,
        }}
        onClick={() => {
          history.push('/user/employee/login');
        }}
      >
        直接登录
      </Link>
    </div>
  )
}

export default WelcomeUser;
