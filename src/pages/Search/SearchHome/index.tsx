import React from "react";
import { Button, ConfigProvider, Flex, Input, Space } from "antd";
import { DeleteOutlined, HeartOutlined, LeftOutlined, RedoOutlined } from "@ant-design/icons";
import './index.less'
import { history } from "@umijs/max";

const { Search } = Input;

const historyNameList = [
  "后端开发工程师",
  "Java",
  "后端开发",
  "互联网开发",
  "阿里西西",
  "实习生"
]
const searchQueryList = [
  "前端开发工程师", "Python", "全栈工程师", "Web开发", "腾讯科技", "软件工程师", "数据分析师", "人工智能工程师", "谷歌实习", "网络安全工程师"
]
const SearchHome: React.FC = () => {
  return (
    <>
      <div style={{ padding: 20, backgroundColor: '#f0f1f3', height: '100%' }}>
        <ConfigProvider
          theme={{
            components: {
              List: {
                /* 这里是你的组件 token */
                itemPadding: '5px 0'
              },
            },
            token: {
              borderRadius: 10,
              colorPrimary: '#47C8CB',
            },
          }}
        >
          <Flex align="center" gap="middle">
            <LeftOutlined style={{ fontSize: 20 }} onClick={() => history.go(-1)} />
            <Search
              placeholder="大家都在搜 后端开发工程师"
              enterButton
              onSearch={(value) => {
                // 设置搜索信息
                history.push(`/search/query?name=${value === '' ? '后端开发工程师' : value}`)
              }} />
          </Flex>
          <Flex gap="large" style={{ marginTop: 18 }} vertical>
            <Flex gap="middle" vertical>
              <Flex align="center" justify="space-between">
                <span className="search-title-name">历史搜索</span>
                <DeleteOutlined className="search-title-icon" />
              </Flex>
              <Space wrap>
                {
                  historyNameList.map((historyName) => (
                    <Button
                      className="search-search-button"
                      key={historyName}
                      onClick={() => {
                        history.push(`/search/query?name=${historyName}`)
                      }}
                    >
                      {historyName}
                    </Button>
                  ))
                }
              </Space>
            </Flex>
            <Flex gap="middle" vertical>
              <Flex align="center" justify="space-between">
                <span className="search-title-name">搜索发现</span>
                <Flex gap="small">
                  <RedoOutlined spin className="search-title-icon" />
                  <span className="search-title-icon-name">换一批</span>
                </Flex>
              </Flex>
              <Space wrap>
                {
                  searchQueryList.map((searchName) => (
                    <Button
                      className="search-search-button"
                      key={searchName}
                      onClick={() => {
                        history.push(`/search/query?name=${searchName}`)
                      }}
                    >
                      {searchName}
                    </Button>
                  ))
                }
              </Space>
            </Flex>
          </Flex>

        </ConfigProvider></div>

    </>
  )
}

export default SearchHome;
