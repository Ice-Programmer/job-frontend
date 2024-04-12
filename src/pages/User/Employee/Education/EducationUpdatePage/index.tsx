import React, { RefObject, useEffect, useMemo, useState } from "react";
import { useParams } from "@umijs/max";
import { Button, ConfigProvider, message } from "antd";
import {
  deleteEducationUsingPost,
  getEducationUsingGet,
  updateEducationUsingPost
} from "@/services/backend/educationExpController";
import styles from '../EducationAddPage/index.less'
import {
  CheckList,
  DatePicker,
  DatePickerRef,
  Dialog,
  Form,
  NavBar,
  Picker,
  Popup,
  SearchBar,
  TextArea
} from "antd-mobile";
import { listSchoolUsingGet } from "@/services/backend/schoolController";
import { listMajorUsingGet } from "@/services/backend/majorController";
import { history } from "@@/core/history";
import dayjs from "dayjs";
import { EducationTypeEnum } from "@/constants/EducationTypeEnum";

const EducationUpdatePage: React.FC = () => {
  const params = useParams();
  const [educationId] = useState(params.educationId);
  const [educationVO, setEducationVO] = useState<API.EmployeeEducationVO>();
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

  /**
   * 获取教育经历
   */
  const getEducation = async () => {
    try {
      const res = await getEducationUsingGet({ educationId: educationId as unknown as number })
      if (res.code === 0 && res.data) {
        setEducationVO(res.data)
      }
    } catch (error: any) {
      message.error(error.message)
    }
  }

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

  /**
   * 更新教育经历
   */
  const updateEducation = async () => {
    const educationUpdateRequest: API.EducationUpdateRequest = {
      id: educationId as unknown as number,
      schoolId: selectSchool ?? educationVO?.schoolId,
      majorId: selectMajor ?? educationVO?.majorId,
      educationType: selectEducationType < 0 ? educationVO?.educationType : selectEducationType,
      beginYear: parseInt(dayjs(form.getFieldValue("beginYear")).format('YYYY')),
      endYear: parseInt(dayjs(form.getFieldValue("endYear")).format('YYYY')),
      activity: form.getFieldValue("activity")
    }
    try {
      const res = await updateEducationUsingPost(educationUpdateRequest);
      if (res.code === 0) {
        message.success("更新教育经历成功")
        history.go(-1)
      }
    } catch (error: any) {
      message.error(error.message)
    }
  }

  /**
   * 删除教育经历
   */
  const deleteEducation = async () => {
    try {
      const res = await deleteEducationUsingPost({ id: educationVO?.id })
      if (res.code === 0) {
        message.success("删除教育经历成功")
        history.go(-1)
      }
    } catch (error: any) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    getEducation().then();
    getSchoolList().then();
    getMajorList().then();
  }, [])

  return (
    educationVO ?
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#47C8CB',
          },
        }}
      >
        <NavBar
          back='返回'
          onBack={() => history.go(-1)}
          right={

            <a
              style={{ color: '#FF0000', fontWeight: 500, fontSize: 15 }}
              // onClick={showDeleteConfirm}
              onClick={() =>
                Dialog.show({
                  title: '删除教育经历',
                  content: <span>你是否确认删除<span style={{ fontWeight: "bolder" }}>【{educationVO?.schoolName}】</span>教育经历?</span>,
                  closeOnAction: true,
                  actions: [
                    [
                      {
                        key: 'cancel',
                        text: '取消',
                      },
                      {
                        key: 'delete',
                        text: '删除',
                        bold: true,
                        danger: true,
                        onClick: deleteEducation
                      },
                    ],
                  ],
                })}
            >
              删除
            </a>

          }
        >
          <span style={{ fontWeight: "bolder" }}>编辑教育经历</span>
        </NavBar>
        <Form requiredMarkStyle='asterisk' form={form} footer={
          <Button
            className={styles.educationUpdateButton}
            shape="round"
            block
            type="primary"
            onClick={updateEducation}
          >
            修改教育经历
          </Button>
        }>

          <Form.Item
            rules={[{ required: true }]}
            label="学校"
            onClick={() => {
              setSchoolVisible(true)
              setSearchText('')
            }}
          >
            {
              schoolList && educationVO.schoolId ?
                <div style={{ fontWeight: "bolder" }}>
                  {
                    selectSchool ?
                      schoolList[selectSchool - 1].schoolName :
                      schoolList[educationVO.schoolId - 1].schoolName
                  }
                </div> :
                null
            }
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="专业"
            onClick={() => {
              setMajorVisible(true)
              setSearchText('')
            }}
          >
            {
              majorList && educationVO.majorId ?
                <div style={{ fontWeight: "bolder" }}>
                  {
                    selectMajor && majorList ?
                      majorList[selectMajor - 1].majorName :
                      majorList[educationVO.majorId - 1].majorName
                  }
                </div> :
                null
            }
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="学历"
            onClick={() => {
              setEducationVisible(true)
            }}
          >
            {
              educationVO.educationType ?
                <div style={{ fontWeight: "bolder" }}>
                  {
                    selectEducationType >= 0 ?
                      EducationTypeEnum[selectEducationType].label :
                      EducationTypeEnum[educationVO.educationType].label
                  }
                </div> :
                null
            }

          </Form.Item>
          {
            educationVO.beginYear ?
              <Form.Item
                name='beginYear'
                label='入学时间'
                rules={[{ required: true }]}
                trigger='onConfirm'
                onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
                  datePickerRef.current?.open()
                }}
                initialValue={new Date(educationVO.beginYear, 0, 1)}
              >
                <DatePicker precision="year">
                  {
                    value =>
                      <span style={{ fontWeight: "bolder" }}>
                  {value ? dayjs(value).format('YYYY') : educationVO?.beginYear}
                </span>
                  }
                </DatePicker>
              </Form.Item> :
              null
          }

          {
            educationVO.endYear ?
              <Form.Item
                name='endYear'
                label='毕业时间'
                rules={[{ required: true }]}
                trigger='onConfirm'
                onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
                  datePickerRef.current?.open()
                }}
                initialValue={new Date(educationVO.endYear, 0, 1)}
              >
                <DatePicker precision="year">
                  {
                    value =>
                      <span style={{ fontWeight: "bolder" }}>
                  {value ? dayjs(value).format('YYYY') : educationVO?.endYear}
                </span>
                  }
                </DatePicker>
              </Form.Item> :
              null
          }


          <Form.Item
            name='activity'
            label='在校经历'
            help='在校活动经历，学习经历，学习排名，参加实验室，项目等。让面试官更好的认识你'
            initialValue={educationVO.activity}
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
      </ConfigProvider> :
      null
  )
}
export default EducationUpdatePage;
