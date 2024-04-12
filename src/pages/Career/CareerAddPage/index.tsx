import React, { ReactNode, useEffect, useState } from "react";
import { Cascader, Flex, message, Select, Switch } from "antd";
import { history } from "@@/core/history";
import {
  Form,
  NavBar,
  Stepper
} from "antd-mobile";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { getIndustryListUsingGet } from "@/services/backend/industryController";
import { getAddressListUsingGet } from "@/services/backend/cityController";
import { addEmployeeWishCareerUsingPost } from "@/services/backend/employeeWishCareerController";

interface SelectPosition {
  positionId: number;
  positionName: string;
}

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const CareerAddPage: React.FC = () => {
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams();
  let positionId = searchParams.get("positionId")
  const [selectIndustryIds, setSelectIndustryIds] = useState<number[]>([])
  const [selectCityId, setSelectCityId] = useState<number>();
  const [minSalary, setMinSalary] = useState<number>(10);
  const [maxSalary, setMaxSalary] = useState<number>(15);
  const [notSalary, setNotSalary] = useState<boolean>(false);
  const [addressList, setAddressList] = useState<Option[]>();
  const [industryVOList, setIndustryVOList] = useState<{ label: ReactNode; title: string; options: { label: string; value: number }[] }[]>()
  let positionName = searchParams.get("positionName")
  const [selectPosition, setSelectPosition] = useState<SelectPosition | undefined>(positionId && positionName ? {
    positionId: parseInt(positionId),
    positionName
  } : undefined);

  const suffix = (
    <>
      <span>
        {selectIndustryIds.length} / 3
      </span>
      <DownOutlined />
    </>
  );

  /**
   * 获取城市列表
   */
  const getCityList = async () => {
    try {
      const res = await getAddressListUsingGet();
      if (res.data && res.code === 0) {
        // setAddressList(res.data)
        const cityList = res.data.map((address) => ({
          label: address.provinceName,
          value: address.id,
          children: address.cityList?.map((city) => ({
            label: city.cityName,
            value: city.id
          }))
        }) as Option)
        setAddressList(cityList)
      }
    } catch (error: any) {
      message.error(error.message)
    }
  }

  /**
   * 获取职业列表
   */
  const getIndustryList = async () => {
    try {
      const res = await getIndustryListUsingGet();
      if (res.code === 0 && res.data) {
        const industryTypeList = res.data.map(industry => ({
          label: <span>{industry.industryType}</span>,
          title: industry.industryType,
          options: industry.industryInfoList?.map(industryInfo => ({
            label: industryInfo.industryName ?? '',
            value: industryInfo.id ?? 0
          }))
        }) as { label: ReactNode; title: string; options: { label: string; value: number }[] });
        setIndustryVOList(industryTypeList)
      }
    } catch (error: any) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    getIndustryList().then()
    getCityList().then()
  }, [])

  return (
    <div>
      <NavBar
        back='返回'
        onBack={() => history.push("/home/user?tabIndex=careerInfo")}
        right={
          <a
            style={{ color: '#47C8CB', fontWeight: 500, fontSize: 15 }}
            onClick={async () => {
              const careerAddRequest: API.EmployeeWishCareerAddRequest = {
                positionId: selectPosition?.positionId,
                industryIdList: selectIndustryIds,
                cityId: selectCityId,
                salaryExpectation: !notSalary ? `${minSalary}-${maxSalary}` : '-'
              }
              try {
                const res = await addEmployeeWishCareerUsingPost(careerAddRequest);
                if (res.code === 0 && res.data) {
                  message.success("添加理想职业成功！")
                  history.push("/home/user?tabIndex=careerInfo")
                }
              } catch (error: any) {
                message.error(error.message)
              }

            }}
          >
            保存
          </a>
        }
      >
        <span style={{ fontWeight: "bolder" }}>添加理想职业</span>
      </NavBar>
      <Form requiredMarkStyle='asterisk' form={form}>
        <Form.Item
          name='position'
          rules={[{ required: true }]}
          label="期望职位"
        >
          <div
            style={selectPosition ? { fontWeight: "bolder" } : undefined}
            onClick={() => {
              const routePath = positionId && positionName ?
                `/career/list?positionId=${positionId}&positionName=${positionName}` :
                "/career/list";
              history.push(routePath)
            }}
          >
            <Flex align={"center"} justify={"space-between"}>
              <span>{selectPosition ? selectPosition.positionName : "请选择期望职业"}</span>
              <RightOutlined />
            </Flex>
          </div>
        </Form.Item>
        <Form.Item
          name='school'
          rules={[{ required: true }]}
          label="行业"
          disabled={selectPosition === undefined}
        >
          <Select
            placeholder="请选择职业所属行业"
            maxCount={3} mode="multiple"
            options={industryVOList}
            style={{ width: '100%' }}
            suffixIcon={suffix}
            onChange={(value) => {
              setSelectIndustryIds(value.map((v: string) => parseInt(v)))
            }}
          />
        </Form.Item>
        <Form.Item
          name='city'
          rules={[{ required: true }]}
          label="城市"
          disabled={selectPosition === undefined}
        >
          <Cascader style={{ width: '100%' }} options={addressList} onChange={(value: any) => {
            setSelectCityId(parseInt(value[1]))
          }} placeholder="请选择城市" />
        </Form.Item>
        <Form.Item
          name='minSalary'
          layout='horizontal'
          label='最低薪资'
          childElementPosition='right'
          disabled={selectPosition === undefined}
        >
          <Stepper
            formatter={value => `${value} k`}
            max={maxSalary}
            min={0}
            disabled={notSalary}
            defaultValue={minSalary}
            onChange={(value: number) => setMinSalary(value)}
          />
        </Form.Item>
        <Form.Item
          name='maxSalary'
          layout='horizontal'
          label='最高薪资'
          childElementPosition='right'
          disabled={selectPosition === undefined}
        >
          <Stepper
            formatter={value => `${value} k`}
            // parser={text => parseFloat(text.replace('$', ''))}
            min={minSalary}
            disabled={notSalary}
            max={100}
            defaultValue={maxSalary}
            onChange={(value: number) => setMaxSalary(value)}
          />
        </Form.Item>
        <Form.Item
          name='notSalary'
          label='薪资面议'
          layout='horizontal'
          childElementPosition='right'
          disabled={selectPosition === undefined}
        >
          <Switch checked={notSalary} onChange={(val) => setNotSalary(val)} />
        </Form.Item>

      </Form>
    </div>
  );
}

export default CareerAddPage;
