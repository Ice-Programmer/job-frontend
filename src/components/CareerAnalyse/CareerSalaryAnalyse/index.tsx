import React from "react";
import { Flex } from "antd";
import EChartsReact from "echarts-for-react";

const CareerSalaryAnalyse: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['十月', '十一月', '十二月', '一月', '二月', '三月', '四月']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '¥{value}'
      }
    },
    series: [
      {
        name: '平均薪资',
        type: 'line',
        data: [14203, 15099, 15789, 16421, 15133, 14672, 14470],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
    ]
  };

  const cityData = {
    dataset: [
      {
        dimensions: ['name', 'salary'],
        source: [
          ['上海', 17481],
          ['北京', 17431],
          ['深圳', 16020],
          ['杭州', 15387],
          ['广州', 13452],
          ['南京', 13142],
          ['成都', 12649],
          ['武汉', 12129]
        ]
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'salary', order: 'desc' }
        }
      }
    ],
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1
    }
  };
  return (
    <div style={{ height: '120vh' }}>
      <Flex vertical>
        <Flex vertical>
          <span style={{ fontSize: 16, fontWeight: "bolder" }}>职位薪资变化</span>
          <span style={{ color: 'rgb(140 140 140)' }}>近期<span style={{ fontWeight: 600 }}>后端工程师</span>上涨10%，平均值¥144470，最高¥16043</span>
        </Flex>
        <div>
          <EChartsReact style={{ top: '-30px' }} option={option} />
        </div>
        <div style={{ position: "absolute", top: 310 }}>
          <Flex style={{ top: '-10px' }} vertical>
            <span style={{ fontSize: 16, fontWeight: "bolder" }}>职位城市薪资分布</span>
            <span style={{ color: 'rgb(140 140 140)' }}><span style={{ fontWeight: 600 }}>后端工程师</span>岗位主要分布在一线城市，其中「上海」薪资最高平均 ¥17481，新一线「杭州」最高平均 ¥15387 </span>
          </Flex>
          <div style={{ width: '100%', position: "absolute", top: 20 }}>
            <EChartsReact style={{ margin: 'auto', width: '45vh' }} option={cityData} />
          </div>
        </div>
      </Flex>
    </div>
  )
}
export default CareerSalaryAnalyse;
