import React, { RefObject, useEffect, useMemo, useState } from "react";
import {
  CheckList,
  DatePicker,
  DatePickerRef,
  Form,
  NavBar,
  Picker,
  Popup,
  SearchBar,
  TextArea
} from 'antd-mobile'
import { history } from "@umijs/max";
import styles from './index.less'
import { message } from "antd";
import { listSchoolUsingGet } from "@/services/backend/schoolController";
import { listMajorUsingGet } from "@/services/backend/majorController";
import { EducationTypeEnum } from "@/constants/EducationTypeEnum";
import dayjs from "dayjs";
import { addEducationUsingPost } from "@/services/backend/educationExpController";

const EducationAddPage: React.FC = () => {
  const [schoolVisible, setSchoolVisible] = useState(false)
  const [majorVisible, setMajorVisible] = useState(false)
  const [educationVisible, setEducationVisible] = useState(false)
  const [selectSchool, setSelectSchool] = useState<number>()
  const [selectMajor, setSelectMajor] = useState<number>()
  const [selectEducationType, setSelectEducationType] = useState<number>(-1)
  const [searchText, setSearchText] = useState('')
  const [schoolList, setSchoolList] = useState<API.SchoolVO[]>();
  const [form] = Form.useForm()
  const [majorList, setMajorList] = useState<API.MajorVO[]>();

  const filteredSchool = useMemo(() => {
    if (searchText) {
      return schoolList?.filter(item => item.schoolName?.includes(searchText))
    } else {
      return schoolList
    }
  }, [schoolList, searchText])

  const filteredMajor = useMemo(() => {
    if (searchText) {
      return majorList?.filter(item => item.majorName?.includes(searchText))
    } else {
      return majorList
    }
  }, [majorList, searchText])

  /**
   * 获取学校列表
   */
  const getSchoolList = async () => {
    try {
      const res = await listSchoolUsingGet();
      if (res.code === 0 && res.data) {
        setSchoolList(res.data)
      } else {
        message.error("获取学校列表失败")
      }
    } catch (error: any) {
      message.error("获取学校列表失败")
    }
  }

  /**
   * 获取专业列表
   */
  const getMajorList = async () => {
    try {
      const res = await listMajorUsingGet();
      if (res.code === 0 && res.data) {
        setMajorList(res.data)
      } else {
        message.error("获取专业列表失败")
      }
    } catch (error: any) {
      message.error("获取专业列表失败")
    }
  }

  useEffect(() => {
    getSchoolList().then();
    getMajorList().then();
  }, [])

  return (
    <>
      <NavBar
        back='返回'
        onBack={() => history.go(-1)}
        right={
          <a
            style={{ color: '#47C8CB', fontWeight: 500, fontSize: 15 }}
            onClick={async () => {
              const educationAddRequest: API.EducationAddRequest = {
                schoolId: selectSchool,
                majorId: selectMajor,
                educationType: selectEducationType,
                beginYear: parseInt(dayjs(form.getFieldValue("beginYear")).format('YYYY')),
                endYear: parseInt(dayjs(form.getFieldValue("endYear")).format('YYYY')),
                activity: form.getFieldValue("activity")
              }
              try {
                const res = await addEducationUsingPost(educationAddRequest);
                if (res.code === 0) {
                  message.success("添加教育经历成功")
                  history.go(-1)
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
        <span style={{ fontWeight: "bolder" }}>添加教育经历</span>
      </NavBar>
      <Form requiredMarkStyle='asterisk' form={form}>
        <Form.Item
          name='school'
          rules={[{ required: true }]}
          label="学校"
          onClick={() => {
            setSchoolVisible(true)
            setSearchText('')
          }}
        >
          <div style={selectSchool ? { fontWeight: "bolder" } : undefined}>
            {selectSchool && schoolList ? schoolList[selectSchool - 1].schoolName : "请选择学校"}
          </div>
        </Form.Item>
        <Form.Item
          name='major'
          rules={[{ required: true }]}
          label="专业"
          onClick={() => {
            setMajorVisible(true)
            setSearchText('')
          }}
        >
          <div style={selectMajor ? { fontWeight: "bolder" } : undefined}>
            {selectMajor && majorList ? majorList[selectMajor - 1].majorName : "请选择专业"}
          </div>
        </Form.Item>
        <Form.Item
          name='major'
          rules={[{ required: true }]}
          label="学历"
          onClick={() => {
            setEducationVisible(true)
          }}
        >
          <div style={selectEducationType >= 0 ? { fontWeight: "bolder" } : undefined}>
            {selectEducationType >= 0 ? EducationTypeEnum[selectEducationType].label : "请选择学校"}
          </div>
        </Form.Item>
        <Form.Item
          name='beginYear'
          label='入学时间'
          rules={[{ required: true }]}
          trigger='onConfirm'
          onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
            datePickerRef.current?.open()
          }}
        >
          <DatePicker precision="year">
            {value =>
              value ? <span style={{ fontWeight: "bolder" }}>{dayjs(value).format('YYYY')}</span> : '请选择入学时间'
            }
          </DatePicker>
        </Form.Item>
        <Form.Item
          name='endYear'
          label='毕业时间'
          rules={[{ required: true }]}
          trigger='onConfirm'
          onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
            datePickerRef.current?.open()
          }}
        >
          <DatePicker precision="year">
            {value =>
              value ? <span style={{ fontWeight: "bolder" }}>{dayjs(value).format('YYYY')}</span> : '请选择毕业时间'
            }
          </DatePicker>
        </Form.Item>
        <Form.Item
          name='activity'
          label='在校经历'
          help='在校活动经历，学习经历，学习排名，参加实验室，项目等。让面试官更好的认识你'
        >
          <TextArea
            placeholder='请输入在校经历'
            maxLength={200}
            rows={2}
            showCount
          />
        </Form.Item>
      </Form>
      <Popup
        visible={schoolVisible}
        onMaskClick={() => {
          setSchoolVisible(false)
        }}
        destroyOnClose
      >
        <div className={styles.searchBarContainer}>
          <SearchBar
            placeholder='输入文字过滤选项'
            value={searchText}
            onChange={v => {
              setSearchText(v)
            }}
          />
        </div>
        <div className={styles.checkListContainer}>
          {
            schoolList ?
              <CheckList
                className={styles.myCheckList}
                multiple={false}
                defaultValue={selectSchool ? [selectSchool] : []}
                onChange={(val) => {
                  setSelectSchool(val[0] as number)
                  setSchoolVisible(false)
                }}
              >
                {filteredSchool?.map(item => (
                  <CheckList.Item key={item.id} value={item.id ?? 1}>
                    {item.schoolName}
                  </CheckList.Item>
                ))}
              </CheckList> :
              null
          }
        </div>
      </Popup>
      <Popup
        visible={majorVisible}
        onMaskClick={() => {
          setMajorVisible(false)
        }}
        destroyOnClose
      >
        <div className={styles.searchBarContainer}>
          <SearchBar
            placeholder='输入文字过滤选项'
            value={searchText}
            onChange={v => {
              setSearchText(v)
            }}
          />
        </div>
        <div className={styles.checkListContainer}>
          {
            majorList ?
              <CheckList
                className={styles.myCheckList}
                multiple={false}
                defaultValue={selectMajor ? [selectMajor] : []}
                onChange={(val) => {
                  setSelectMajor(val[0] as number)
                  setMajorVisible(false)
                }}
              >
                {filteredMajor?.map(item => (
                  <CheckList.Item key={item.id} value={item.id ?? 1}>
                    {item.majorName}
                  </CheckList.Item>
                ))}
              </CheckList> :
              null
          }
        </div>
      </Popup>
      <Picker
        columns={[EducationTypeEnum]}
        visible={educationVisible}
        onClose={() => {
          setEducationVisible(false)
        }}
        value={selectEducationType ? [selectEducationType] : []}
        onConfirm={v => {
          console.log(v[0] as number)
          setSelectEducationType(v[0] as number)
        }}
      />
    </>
  )
}

export default EducationAddPage;
