import { ConfigProvider, message } from "antd";
import { LoginForm, ProFormCheckbox, ProFormText } from "@ant-design/pro-components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import React from "react";
import { getCurrentUserUsingGet, userLoginUsingPost } from "@/services/backend/userController";
import { history, useModel } from "@umijs/max";
import { flushSync } from "react-dom";

interface Props {
  userRole: string
}

const LoginFormComponent: React.FC<Props> = (props) => {
  const { userRole } = props;
  const { setInitialState } = useModel('@@initialState');

  /**
   * 获取用户登录信息
   */
  const fetchUserInfo = async () => {
    const userInfo = await getCurrentUserUsingGet();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s: any) => ({
          ...s,
          currentUser: userInfo.data,
        }));
      });
    }
  };

  /**
   * 登录请求
   */
  const handleLogin = async (values: any) => {
    if (values.checkPolicy) {
      const loginRequest: API.UserLoginRequest = {
        ...values,
        userRole
      }
      console.log(loginRequest);
      try {
        const res = await userLoginUsingPost(loginRequest);
        if (res.code === 0) {
          const defaultLoginSuccessMessage = '登录成功！';
          message.success(defaultLoginSuccessMessage);
          console.log(res);
          if (res?.data?.token) {
            localStorage.setItem('accessToken', res.data.token);
          }
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/home/job');
          return;
        } else {
          message.error(res.message);
        }
      } catch (error: any) {
        const defaultLoginFailureMessage = '登录失败，请重试！';
        console.log(error);
        message.error(defaultLoginFailureMessage);
      }
    } else {
      message.warning("请阅读并同意《隐私政策》")
    }

  }
  return (
    <>
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#47C8CB",
            },
            components: {
              Button: {
                contentFontSizeLG: 20,
                fontWeight: "bold",
                controlHeightLG: 50
              },
              Input: {
                controlHeightLG: 50
              },
            },
          }}
        >
          <LoginForm
            contentStyle={{
              minWidth: 280,
              maxWidth: '80vw',
            }}
            onFinish={async (values) => {
              await handleLogin(values)
            }}
          >
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                style={{ height: 500 }}
                placeholder="账号"
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox initialValue={false} noStyle name="checkPolicy">
                <FormattedMessage id="pages.login.rememberMe" defaultMessage={
                  `已阅读并同意`
                } />
                <a href="#" style={{ color: "#47C8CB" }}>《隐私政策》</a>
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                  color: "#47C8CB"
                }}
              >
                <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码?" />
              </a>
            </div>
          </LoginForm>
        </ConfigProvider>
      </div>
      <div style={{ textAlign: "center", fontSize: 14, color: "#AFB0B6", fontWeight: "bold" }}>还没有账号？
        <a style={{ color: "#47C8CB" }}>注册</a>
      </div>
    </>
  )
}

export default LoginFormComponent;
