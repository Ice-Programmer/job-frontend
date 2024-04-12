import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { SearchProps } from 'antd/es/input/Search';
import { AudioOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';

import data from "./yuan.json";
import { Card, ConfigProvider, Input } from "antd";

const { Search } = Input;

const GraphDemo = () => {
  useEffect(() => {
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);


    const option = {
      tooltip: {
        formatter: (params) => {
          const nodeData = params.data;
          //const tooltipContent = `节点名称：${nodeData.name}<br/>节点属性：${nodeData.attribute}`;
          if (nodeData.category == 0) {
            const tooltipContent = `<strong>${nodeData.name}</strong><br/><br/><strong>平均薪资情况</strong>` +
              `<br/>硕士及以上：${nodeData.d1}<br/>本科：${nodeData.d2}<br/>专科：${nodeData.d3}`;
            return tooltipContent;
          }
        },
      },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: "graph",
          layout: "circular",
          circular: {
            rotateLabel: true
          },
          //animation: false,
          label: {
            show: true,
            position: "inside",
            formatter: "{b}",
          },
          draggable: true,
          roam: true,
          data: data.nodes,
          categories: data.categories,
          links: data.links,
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 10
            }
          }
        },
      ],
    };
    // const option = {
    //   tooltip: {
    //     formatter: (params) => {
    //       const nodeData = params.data;
    //       //const tooltipContent = `节点名称：${nodeData.name}<br/>节点属性：${nodeData.attribute}`;
    //       if(nodeData.category==0){
    //         const tooltipContent = `<strong>${nodeData.name}</strong><br/><br/><strong>平均薪资情况</strong>`+
    //           `<br/>硕士及以上：${nodeData.d1}<br/>本科：${nodeData.d2}<br/>专科：${nodeData.d3}`;
    //         return tooltipContent;
    //       }
    //     },
    //   },
    //   /*legend: {
    //     data: ["职位", "要求"],
    //   },*/
    //   series: [
    //     {
    //       type: "graph",
    //       layout: 'none',
    //       //animation: false,
    //       label: {
    //         show: true,
    //         position: 'right',
    //         formatter: '{b}'
    //       },
    //       lineStyle: {
    //         color: 'source',
    //         curveness: 0.3
    //       },
    //       draggable: true,
    //       data: data.nodes,
    //       categories: data.categories,
    //       roam: true,
    //       force: {
    //         edgeLength: 50,
    //         repulsion: 300,
    //         gravity: 0.1,
    //       },
    //       links: data.links,
    //       emphasis: {
    //         focus: 'adjacency',
    //         lineStyle: {
    //           width: 10
    //         }
    //       }
    //     },
    //   ],
    // };


    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#47C8CB",
        }
      }}
    >
      <div style={{ top: 0, margin: '10px 50px' }}>
          <Search
            placeholder="搜索相关职业"
            enterButton="搜索"
            size="large"
            suffix={<AudioOutlined
              style={{
                fontSize: 16,
                color: '#1677ff',
              }}
            />}
            onSearch={(value, _e, info) => history.push("/home/graph/detail")}
          />
      </div>
      <div id="main" style={{ width: "100%", height: "100%" }}></div>
    </ConfigProvider>
  );
};

export default GraphDemo;
