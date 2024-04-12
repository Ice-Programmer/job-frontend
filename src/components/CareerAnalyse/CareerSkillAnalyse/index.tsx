import React from "react";
import { Avatar, Flex } from "antd";
import { CheckCard } from "@ant-design/pro-card";
import { Dialog } from "antd-mobile";

const CareerSkillAnalyse: React.FC = () => {
  return (
    <>
      <Flex vertical gap="middle">
        <img src="/career/career_major.jpg" alt="专业分析" />
        <Flex gap="small" style={{ marginLeft: 10 }} vertical>
          <span style={{ fontSize: 20, fontWeight: "bolder" }}>从业条件</span>
          <Flex vertical style={{ color: "black" }}>
            <span>
              <span style={{ fontWeight: 600, color: 'rgb(140 140 140)' }}>学历要求：</span> 大部分要求本科及以上
            </span>
            <span>
            <span style={{ fontWeight: 600, color: 'rgb(140 140 140)' }}>相关专业知识：</span> 算法与数据结构、软件工程、系统设计...
            </span>
          </Flex>
        </Flex>
        <Flex gap="small" style={{ marginLeft: 10 }} vertical>
          <span style={{ fontSize: 20, fontWeight: "bolder" }}>常见技术栈</span>
          <CheckCard.Group style={{ width: '100%' }}>
            <CheckCard
              title="Spring Boot"
              style={{width: '45%'}}
              avatar={
                <Avatar
                  shape={"square"}
                  src="https://gw.alipayobjects.com/zos/bmw-prod/2dd637c7-5f50-4d89-a819-33b3d6da73b6.svg"
                  size="large"
                />
              }
              onClick={() =>
                Dialog.show({
                  title: 'Spring Boot',
                  content: <span>通过业界流行的技术栈来快速构建 Java 后端应用</span>,
                  closeOnAction: true,
                  actions: [
                    [
                      {
                        key: 'ok',
                        text: <span style={{ color: "#47C8CB" }}>我知道了</span>,
                        bold: true,
                      },
                    ],
                  ],
                })}
              value="SpringBoot"
            />
            <CheckCard
              title="SOFA Boot"
              style={{width: '45%'}}
              avatar={
                <Avatar
                  shape={"square"}
                  src="https://gw.alipayobjects.com/zos/bmw-prod/6935b98e-96f6-464f-9d4f-215b917c6548.svg"
                  size="large"
                />
              }
              onClick={() =>
                Dialog.show({
                  title: 'SOFA Boot',
                  content: <span>使用 SOFAStack 中间件来快速构建分布式后端应用</span>,
                  closeOnAction: true,
                  actions: [
                    [
                      {
                        key: 'ok',
                        text: <span style={{ color: "#47C8CB" }}>我知道了</span>,
                        bold: true,
                      },
                    ],
                  ],
                })}
              value="SOFABoot"
            />
            <CheckCard
              title="MySQL"
              style={{width: '45%'}}
              avatar={
                <Avatar
                  shape={"square"}
                  src="https://img.bosszhipin.com/beijin/cms/06e6e3cfd81530b13b2438140a381761fbcf1fe2146e01096e1e8f8db8373f69e811d797c9c34358a7a11cc8eca4e9d3.png?x-oss-process=image/format,webp"
                  size="large"
                />
              }
              onClick={() =>
                Dialog.show({
                  title: 'SOFA Boot',
                  content: <span>MySQL是最流行的关系型数据库管理系统之一，在 WEB 应用方面，MySQL是最好的RDBMS 应用软件之一</span>,
                  closeOnAction: true,
                  actions: [
                    [
                      {
                        key: 'ok',
                        text: <span style={{ color: "#47C8CB" }}>我知道了</span>,
                        bold: true,
                      },
                    ],
                  ],
                })}
              value="MySQL"
            />
            <CheckCard
              title="Node JS"
              style={{width: '45%'}}
              avatar={
                <Avatar
                  shape={"square"}
                  src="https://gw.alipayobjects.com/zos/bmw-prod/d12c3392-61fa-489e-a82c-71de0f888a8e.svg"
                  size="large"
                />
              }
              onClick={() =>
                Dialog.show({
                  title: 'NodeJS',
                  content: <span>使用前后端统一的语言方案快速构建后端应用</span>,
                  closeOnAction: true,
                  actions: [
                    [
                      {
                        key: 'ok',
                        text: <span style={{ color: "#47C8CB" }}>我知道了</span>,
                        bold: true,
                      },
                    ],
                  ],
                })}
              value="NodeJS"
            />
          </CheckCard.Group>
        </Flex>
      </Flex>
    </>

  )
}
export default CareerSkillAnalyse;
