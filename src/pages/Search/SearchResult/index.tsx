import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { pageRecruitmentUsingPost } from "@/services/backend/recruitmentController";
import { ConfigProvider, Flex, Input, List, message, Tabs } from "antd";
import RecruitmentInfoCard from "@/components/RecruitmentInfoCard";
import EmptyInfo from "@/components/EmptyInfo";
import { LeftOutlined } from "@ant-design/icons";
import { history } from "@@/core/history";
const { Search } = Input;

const SearchResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  let name = searchParams.get("name")
  const initSearchParam = {
    current: 1,
    pageSize: 10,
    searchText: name ?? ''
  };
  const [searchName, setSearchName] = useState<string>(name ?? '')
  const [recruitmentList, setRecruitmentList] = useState<API.RecruitmentVO[]>();
  const [searchParam, setSearchParam] = useState<API.RecruitmentQueryRequest>({ ...initSearchParam });

  const searchRecruitmentList = async () => {
    try {
      const res = await pageRecruitmentUsingPost(searchParam);
      if (res.code === 0 && res.data) {
        setRecruitmentList(res.data.records);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    searchRecruitmentList().then();
  }, [searchName])


  return (
    <>
      <div style={{ padding: 20, backgroundColor: '#f0f1f3', height: '100%'  }}>
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
              value={searchName}
              onSearch={(value) => {
                // 设置搜索信息
                setSearchParam({
                  ...searchParam,
                  searchText: value
                })
              }} />
          </Flex>
          <Tabs
            style={{ height: 50 }}
            defaultActiveKey={'comprehensive'}
            // onChange={onTypeChange}
            tabBarExtraContent={
              <a
                style={{
                  display: 'flex',
                  gap: 4,
                  color: 'black'
                }}
              >
                高级筛选
              </a>
            }
            items={[
              {
                key: 'comprehensive',
                label: '综合',
              },
              {
                key: 'new',
                label: '最新',
              },
            ]}
          />
          {recruitmentList ?
            <List
              dataSource={recruitmentList}
              // loading={recruitmentLoading}
              split={false}
              renderItem={(recruitmentVO: API.RecruitmentVO) => (
                <List.Item>
                  <RecruitmentInfoCard key={recruitmentVO.id} recruitmentInfo={recruitmentVO} />
                </List.Item>
              )}
            /> :
            <EmptyInfo />
          }
        </ConfigProvider>
      </div>

    </>
  )

}

export default SearchResult;
