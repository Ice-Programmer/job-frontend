import React from "react";
import { TabBar } from "antd-mobile";
import { Outlet } from "react-router-dom";
import './index.less'
import {
  AppstoreOutlined,
  CommentOutlined,
  DeploymentUnitOutlined,
  UserOutlined
} from "@ant-design/icons";
import { history } from "@umijs/max";
import { useLocation } from "@@/exports";

const HomeLayout: React.FC = () => {
  const location = useLocation()
  const { pathname } = location

  const setRouteActive = (value: string) => {
    history.push(value)
  }

  const tabs = [
    {
      key: '/home/job',
      title: '职位',
      icon: <AppstoreOutlined />,
    },
    {
      key: '/home/chat',
      title: '聊天',
      icon: <CommentOutlined />,
    },
    {
      key: '/home/graph',
      title: '图谱',
      icon: <DeploymentUnitOutlined />,
    },
    {
      key: '/home/user',
      title: '我的',
      icon: <UserOutlined />,
    },
  ]
  return (
    <div className="page-background">
      <Outlet />
      <TabBar activeKey={pathname} className="job-tab-bar" onChange={value => setRouteActive(value)}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} className="tab-bar-item" />
        ))}
      </TabBar>
    </div>
  );
};

export default HomeLayout;
