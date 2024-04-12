import React, { useState } from "react";
import {
  Card,
  ConfigProvider,
  Flex,
  FloatButton,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select, SelectProps,
  Tag,
} from "antd";
import { EditOutlined, UploadOutlined } from "@ant-design/icons";
import './index.less'
const { TextArea } = Input;

interface Props {
  employeeVO: API.EmployeeVO
}

type TagRender = SelectProps['tagRender'];
const colorList = [
  'red',
  'magenta',
  'volcano',
  'orange',
  'gold',
  'lime',
  'cyan',
  'green',
  'blue',
  'geekblue',
  'purple',
];
const graduateOptions: SelectProps['options'] = [
  {
    label: '专科',
    value: 0
  },
  {
    label: '本科',
    value: 1
  },
  {
    label: '硕士',
    value: 2
  },
  {
    label: '博士',
    value: 3
  },
];
const jobOptions: SelectProps['options'] = [
  {
    label: '离校随时到岗',
    value: 0
  },
  {
    label: '在校月内到岗',
    value: 1
  },
  {
    label: '在校考虑机会',
    value: 2
  },
  {
    label: '在校暂不考虑',
    value: 3
  },
]

const EmployeeBasicInfo: React.FC<Props> = (props) => {
  const { employeeVO } = props
  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [gender, setGender] = useState<number>(employeeVO.gender ?? 0);


  const tagRender: TagRender = (props) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={colorList[Math.floor(Math.random() * colorList.length)]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        // style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <div className="employer-basic-info">
      <ConfigProvider
        theme={{
          token: {
            /* 这里是你的全局 token */
            colorPrimary: '#47C8CB',
            colorBgContainerDisabled: '#ffffff',
            colorTextDisabled: '#524B6B',
            fontSizeLG: 13,
            colorBorder: '#ffffff',
          },
        }}
      >
        <Form
          initialValues={employeeVO}
        >
          <Flex vertical gap={"middle"}>
            <Flex gap="small" vertical>
              <span className="user-basic-info-name">
                姓名
              </span>
              <Input
                size="large"
                name="userName"
                defaultValue={employeeVO.userName}
                readOnly={readOnly}
              />
            </Flex>
            <Flex gap="middle">
              <Flex gap="small" style={{ width: "100%" }} vertical>
                <span className="user-basic-info-name">居住地</span>
                <Input
                  size="large"
                  name="cityName"
                  defaultValue={employeeVO.cityName}
                  readOnly={readOnly}
                />
              </Flex>
              <Flex gap="small" style={{ width: "100%" }} vertical>
                <span className="user-basic-info-name">年龄</span>
                <InputNumber
                  readOnly={readOnly}
                  size="large"
                  min={1}
                  style={{ width: "100%" }}
                  max={100}
                  defaultValue={employeeVO.age}
                />
              </Flex>
            </Flex>
            <Flex gap="small" vertical>
              <span>性别</span>
              <Radio.Group name="gender" value={gender}>
                <Flex gap={15}>
                  <Card hoverable={!readOnly} onClick={() => {
                    if (!readOnly) {
                      setGender(0)
                    }
                  }} size="small" style={{ width: '100%' }}>
                    <Radio value={0}>男</Radio>
                  </Card>
                  <Card hoverable={!readOnly} onClick={() => {
                    if (!readOnly) {
                      setGender(1)
                    }
                  }} size="small" style={{ width: '100%' }}>
                    <Radio value={1}>女</Radio>
                  </Card>
                </Flex>
              </Radio.Group>
              <Flex gap="small" vertical>
                <span className="user-basic-info-name">邮箱</span>
                <Input
                  size="large"
                  name="email"
                  style={{ width: "100%" }}
                  defaultValue={employeeVO.email}
                  readOnly={readOnly}
                />
              </Flex>
              <Flex gap="small" vertical>
                <span className="user-basic-info-name">手机号</span>
                <Input
                  size="large"
                  name="userPhone"
                  style={{ width: "100%" }}
                  defaultValue={employeeVO.userPhone}
                  readOnly={readOnly}
                />
              </Flex>

              <Flex gap="small" vertical>
                <span className="user-basic-info-name">技能标签</span>
                <Select
                  size="large"
                  tagRender={tagRender}
                  mode="tags"
                  maxLength={5}
                  disabled={readOnly}
                  defaultValue={employeeVO.skillTagList}
                  style={{ width: '100%' }}
                  // onChange={handleChange}
                  tokenSeparators={[',']}
                  // options={['Java']}
                />
              </Flex>
              <Flex gap="middle">
                <Flex gap="small" style={{ width: "100%" }} vertical>
                  <span className="user-basic-info-name">学历</span>
                  <Select
                    disabled={readOnly}
                    size="large"
                    defaultValue={employeeVO.education}
                    options={graduateOptions}
                  />
                </Flex>
                <Flex gap="small" style={{ width: "100%" }} vertical>
                  <span className="user-basic-info-name">毕业年份</span>
                  <Input
                    readOnly={readOnly}
                    size="large"
                    defaultValue={employeeVO.graduateYear}
                  />
                </Flex>
              </Flex>
              <Flex gap="small" vertical>
                <span className="user-basic-info-name">求职状态</span>
                <Select
                  disabled={readOnly}
                  size="large"
                  defaultValue={employeeVO.jobStatus}
                  options={jobOptions}
                />
              </Flex>
              <Flex gap="small" vertical>
                <span className="user-basic-info-name">个人优势</span>
                <TextArea
                  size="large"
                  showCount
                  maxLength={100}
                  name="advantage"
                  defaultValue={employeeVO.advantage}
                  readOnly={readOnly}
                  style={{ height: 100, resize: 'none' }}
                />
              </Flex>
            </Flex>
          </Flex>

        </Form>
        <FloatButton
          type="primary"
          style={{ right: 24, bottom: 100 }}
          icon={readOnly ? <EditOutlined /> : <UploadOutlined />}
          onClick={() => {
            if (readOnly) {
              setReadOnly(false)
              message.success("开启编辑模式")
            } else {
              setReadOnly(true)
              message.success("保存成功")
            }
          }}
        />
      </ConfigProvider>

    </div>
  )
}

export default EmployeeBasicInfo;
