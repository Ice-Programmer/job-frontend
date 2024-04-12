import React, { useEffect, useState } from "react";
import { Alert, Avatar, ConfigProvider, Flex, message, Tabs, TabsProps } from "antd";
import { getCurrentEmployeeUsingGet } from "@/services/backend/employeeController";
import { FileTextOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import './index.less'
import EmployeeBasicInfo from "@/components/UserInfo/EmployeeInfo/EmployeeBasicInfo";
import EmployeeWishCareerInfo from "@/components/UserInfo/EmployeeInfo/EmployeeWishCareerInfo";
import EmployeeExperienceInfo from "@/components/UserInfo/EmployeeInfo/EmployeeExperienceInfo";
import { history, useParams } from "@umijs/max";
import { useSearchParams } from "react-router-dom";

const UserHome: React.FC = () => {
  const [searchParams] = useSearchParams();
  let tabIndex = searchParams.get("tabIndex")
  const [userInfo, setUserInfo] = useState<API.EmployeeVO>();

  const items: TabsProps['items'] = [
    {
      key: 'basicInfo',
      label: '个人信息',
      children: <EmployeeBasicInfo employeeVO={userInfo ?? {}} />,
    },
    {
      key: 'careerInfo',
      label: '理想职位',
      children: <EmployeeWishCareerInfo employeeVO={userInfo ?? {}} />,
    },
    {
      key: 'experienceInfo',
      label: '个人经历',
      children: <EmployeeExperienceInfo employeeVO={userInfo ?? {}} />,
    },
  ];


  /**
   * 获取当前登录应聘者
   */
  const getCurrentEmployee = async () => {
    try {
      const res = await getCurrentEmployeeUsingGet();
      if (res.code === 0 || res.data) {
        setUserInfo(res.data);
      }
    } catch (error: any) {
      message.error(error.message);
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentEmployee().then();
  }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            /* 这里是你的组件 token */
            inkBarColor: '#ffffff',
            itemSelectedColor: '#ffffff',
            itemColor: '#f0f1f3',
            titleFontSizeSM: 12,
            itemHoverColor: '#ffffff',
            itemActiveColor: '#ffffff'
          },
        },
      }}
    >
      <Flex className="user-info-icon" gap="middle">
        <FileTextOutlined onClick={() => history.push("/user/employee/biography")} />
        <SettingOutlined />
      </Flex>
      {
        userInfo ?
          <div className="user-info">
            <Flex gap="small" align="center" vertical>
              <Avatar size={106} src="/avatar_square.png" />
              <span className="user-info-name">{userInfo?.userName}</span>
              <span className="user-info-advantage">{userInfo?.advantage}</span>
              <Flex justify="space-around" className="user-info-analyse">
                <Flex gap="small" align="center" vertical>
                  <span className="user-info-analyse-number">27</span>
                  <span className="user-info-analyse-name">已投简历</span>
                </Flex>
                <Flex gap="small" align="center" vertical>
                  <span className="user-info-analyse-number">19</span>
                  <span className="user-info-analyse-name">浏览足迹</span>
                </Flex>
                <Flex gap="small" align="center" vertical>
                  <span className="user-info-analyse-number">14</span>
                  <span className="user-info-analyse-name">收藏数</span>
                </Flex>
              </Flex>
            </Flex>
            <Tabs
              className="user-info-tab"
              size={"small"}
              // onChange={(value) => {console.log(value)}}
              onChange={(value) => history.push(`/home/user?tabIndex=${value}`)}
              activeKey={tabIndex ?? "basicInfo"}
              tabBarGutter={60}
              centered
              items={items}
            />
          </div>
          : null
      }
    </ConfigProvider>

  )
}

export default UserHome;
