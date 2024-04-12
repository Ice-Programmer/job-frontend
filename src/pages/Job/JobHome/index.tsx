import React, { useEffect, useState } from "react";
import { Button, Carousel, ConfigProvider, Flex, Input, List, message, Space, Tabs, Typography } from "antd";
import {
  FireFilled,
} from "@ant-design/icons";
import RecruitmentInfoCard from "@/components/RecruitmentInfoCard";
import { history, useModel } from "@umijs/max";
import { pageEmployeeWishCareerUsingPost } from "@/services/backend/employeeWishCareerController";
import EmptyInfo from "@/components/EmptyInfo";
import { pageRecruitmentUsingPost } from "@/services/backend/recruitmentController";
import './index.less'
import RankPositionCard from "@/components/RankCard/RankPositionCard";
import RankMajorCard from "@/components/RankCard/RankMajorCard";
import RankCityCard from "@/components/RankCard/RankCityCard";

const { Title } = Typography;
const { Search } = Input;

const wishSentenceList = [
  "在这里，每次点击都是向梦想更近一步",
  "不断努力，梦想终将实现",
  "相信自己，梦想即将绽放",
  "坚定目标，梦想的路上不停歇",
  "勇敢追逐，梦想将在你的不屈不挠中绽放光芒",
  "不放弃的执着，是通向梦想实现的钥匙",
  "勇敢探索未知，梦想将引领前行",
  "勇气和决心铸就梦想的实现"
]


const contentStyle: React.CSSProperties = {
  height: "17%",
  width: "100%",
  marginTop: "10px",

};
const JobHome: React.FC = () => {
  const initSearchParam = {
    current: 1,
    pageSize: 8,
  };

  const [randomWish, setRandomWish] = useState('');
  const [selectPosition, setSelectPosition] = useState<number>(0);
  const [wishCareerList, setWishCareerList] = useState<{ positionId: number, positionName: string }[]>();
  const [recruitmentLoading, setRecruitmentLoading] = useState<boolean>(false);
  const [recruitmentList, setRecruitmentList] = useState<API.RecruitmentVO[]>();
  const [searchParam, setSearchParam] = useState<API.RecruitmentQueryRequest>({ ...initSearchParam });

  const currentTime = new Date().getHours();
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  let greeting;

  // 判断招呼词
  if (currentTime < 12) {
    greeting = '早上好';
  } else if (currentTime < 18) {
    greeting = '中午好';
  } else {
    greeting = "晚上好";
  }

  /**
   * 切换职业
   * @param positionId 职业id
   */
  const changePosition = (positionId: number) => {
    setSelectPosition(positionId);
    setSearchParam({
      ...initSearchParam,
      positionId: positionId !== 0 ? positionId : undefined
    })
  }

  /**
   * 获取用户期望职业
   */
  const getUserWishPositionList = async () => {
    try {
      const wishPositionQueryRequest: API.EmployeeWishCareerQueryRequest = {
        userId: currentUser?.id
      }
      const res = await pageEmployeeWishCareerUsingPost(wishPositionQueryRequest);
      if (res.code === 0 && res.data) {
        let dataList = res.data?.records?.map((career) => ({
          positionId: career?.positionInfo?.id ?? 0,
          positionName: career?.positionInfo?.positionName ?? '',
        }))
        setWishCareerList(dataList ?? []);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 获取职业列表
   */
  const getRecruitmentList = async () => {
    setRecruitmentLoading(true);
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
    setRecruitmentLoading(false);
  }

  useEffect(() => {
    if (randomWish === '') {
      const randomIndex = Math.floor(Math.random() * wishSentenceList.length);
      setRandomWish(wishSentenceList[randomIndex]);
    }
    if (!wishCareerList) {
      getUserWishPositionList().then()
    }
    getRecruitmentList().then();
  }, [searchParam]);
  return (
    <div style={{ padding: 20, }}>
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
        <div style={{ width: '100%' }}>
          <Flex vertical gap={3}>
            <Flex align="start" gap={20} style={{ marginTop: 6, width: '100%' }}>
              <Title style={{ whiteSpace: "nowrap", color: '#0D013F' }}
                     level={4}>{greeting}，陈同学</Title>
              <div style={{ width: '100%' }} onClick={() => history.push("/search")}>
                <Search placeholder="大家都在搜 后端开发工程师" enterButton />
              </div>

            </Flex>
            <span style={{ fontSize: 16, fontWeight: "bolder", color: '#95969D' }}>{randomWish}</span>
            <Carousel autoplay>
              <div>
                <img style={contentStyle} src="/job/job_ad_1.jpg" alt="job_ad_1" />
              </div>
              <div>
                <img style={contentStyle} src="/job/job_ad_2.jpg" alt="job_ad_2" />
              </div>
              <div>
                <img style={contentStyle} src="/job/job_ad_3.jpg" alt="job_ad_3" />
              </div>
            </Carousel>

            <span style={{
              color: '#0D013F',
              margin: "10px 0",
              fontSize: 16,
              fontWeight: 900
            }}>热门统计 <FireFilled style={{ color: "#FF4C4C" }} /></span>
            <Flex gap="middle">
              <RankPositionCard />
              <div style={{ width: "50%" }}>
                <Flex vertical gap={26}>
                  {/*<div style={{*/}
                  {/*  height: 81,*/}
                  {/*  backgroundColor: "#F9B0FF",*/}
                  {/*  display: "flex",*/}
                  {/*  justifyContent: "center",*/}
                  {/*  alignItems: "center",*/}
                  {/*  borderRadius: 10*/}
                  {/*}}*/}
                  {/*     onClick={() => history.push("/rank/major")}*/}
                  {/*>*/}
                  {/*  <Space direction="vertical">*/}
                  {/*    <span style={{ fontSize: 16, fontWeight: "bolder" }}>热门专业 <ExperimentFilled /></span>*/}
                  {/*    <span style={{ fontSize: 14, fontWeight: 'bolder' }}>计算机科学与技术...</span>*/}
                  {/*  </Space>*/}
                  {/*</div>*/}
                  <RankMajorCard />
                  {/*<div style={{*/}
                  {/*  height: 81,*/}
                  {/*  backgroundColor: "#FFD6AE",*/}
                  {/*  display: "flex",*/}
                  {/*  justifyContent: "center",*/}
                  {/*  alignItems: "center",*/}
                  {/*  borderRadius: 10*/}
                  {/*}}>*/}
                  {/*  <Space direction="vertical">*/}
                  {/*    <span style={{ fontSize: 16, fontWeight: "bolder" }}>热门城市 <HomeFilled /></span>*/}
                  {/*    <span style={{ fontSize: 14, fontWeight: 'bolder' }}>杭州、上海、南京...</span>*/}
                  {/*  </Space>*/}

                  {/*</div>*/}
                  <RankCityCard />
                </Flex>
              </div>
            </Flex>
            <span style={{
              whiteSpace: "nowrap",
              color: '#0D013F',
              margin: "10px 0",
              fontSize: 16,
              fontWeight: 900,
            }}>推荐岗位</span>
            <Space wrap>
              <Button
                onClick={() => {
                  changePosition(0)
                }}
                key={0}
                size="small"
                type={0 === selectPosition ? 'primary' : 'default'}
              >
                综合
              </Button>
              {wishCareerList ? wishCareerList.map((career) => (
                <Button
                  onClick={() => {
                    changePosition(career.positionId)
                  }}
                  key={career.positionId}
                  size="small"
                  type={career.positionId === selectPosition ? 'primary' : 'default'}
                >
                  {career.positionName}
                </Button>
              )) : null}
              <Button size='small' type="dashed">+</Button>
            </Space>
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
          </Flex>
          {recruitmentList ?
            <List
              dataSource={recruitmentList}
              loading={recruitmentLoading}
              split={false}
              renderItem={(recruitmentVO: API.RecruitmentVO) => (
                <List.Item>
                  <RecruitmentInfoCard key={recruitmentVO.id} recruitmentInfo={recruitmentVO} />
                </List.Item>
              )}
            /> :
            <EmptyInfo />}
        </div>
      </ConfigProvider>


    </div>
  )
}

export default JobHome;
