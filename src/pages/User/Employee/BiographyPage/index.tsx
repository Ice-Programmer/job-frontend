import React, { useState } from "react";
import './index.less'
import { CloudUploadOutlined, LeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { history } from "@umijs/max";
import { Button, ConfigProvider, Flex, Upload } from "antd";
import EmployeeBiographyCard from "@/components/UserInfo/EmployeeInfo/EmployeeBiographyCard";
import { Modal } from "antd-mobile";

const BiographyPage: React.FC = () => {
  const [biographyList, setBiographyList] = useState();
  const [biographyLoading, setBiographyLoading] = useState<boolean>(false);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#47C8CB",
        },
        components: {
          Tabs: {
            horizontalItemGutter: 100
          }
        }
      }}
    >
      <div className="user-employee-biography">
        <Flex vertical gap="large">
          <Flex className="user-employee-biography-head" justify="space-between" align="center">
            <LeftOutlined className="user-employee-biography-back" onClick={() => history.go(-1)} />
            <span className="user-employee-biography-title">我的在线简历</span>
            <QuestionCircleOutlined className="user-employee-biography-back" onClick={() =>
              Modal.alert({
                content: '上传你的本地简历，补充你的经历，让面试官更好的认识你',
              })} />

          </Flex>

          {/*{biographyList ?*/}
          {/*  <List*/}
          {/*    itemLayout="vertical"*/}
          {/*    dataSource={biographyList}*/}
          {/*    loading={biographyLoading}*/}
          {/*    split={false}*/}
          {/*    renderItem={(biology: any) => (*/}
          {/*      <List.Item>*/}
          {/*      </List.Item>*/}

          {/*    )}*/}
          {/*  /> :*/}
          {/*  <EmptyInfo />}*/}
          <EmployeeBiographyCard />

        </Flex>
        <Upload style={{ width: '100%' }}>

          <div className="user-employee-biography-tail">
            <Button shape="round" block type="primary"
                    className="user-employee-biography-upload-button">上传简历<CloudUploadOutlined /></Button>

          </div>
        </Upload>

      </div>
    </ConfigProvider>
  )
}
export default BiographyPage;
