import React from "react";
import './index.less'
import { Image, List, SwipeAction } from 'antd-mobile'
import { Action } from "antd-mobile/es/components/swipe-action";

const users = [
  {
    id: '1',
    avatar:
      'https://ice-man-1316749988.cos.ap-shanghai.myqcloud.com/imgs/33eb15ec51fe93747aeba3f391425665.jpeg',
    name: 'ChatGPT 4',
    description: 'Java后端工程师需要什么技能？',
  },
  {
    id: '2',
    avatar:
      'https://ice-man-1316749988.cos.ap-shanghai.myqcloud.com/imgs/5af23510ca89eb93605431610633ef74.jpeg',
    name: '文心一言',
    description: '根据我的简历还有什么不足之处',
  },
  {
    id: '3',
    avatar:
      'https://images.unsplash.com/photo-1542624937-8d1e9f53c1b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'HR Tony',
    description: '您好，请您过目我的简历',
  },
  {
    id: '4',
    avatar:
      'https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'HR Hikari',
    description: '我是否能胜任这份职位？',
  },
];
const rightActions: Action[] = [
  {
    key: 'mute',
    text: '免打扰',
    color: 'warning',
  },
  {
    key: 'delete',
    text: '删除',
    color: 'danger',
  },
]
const ChatHome: React.FC = () => {
  return (
    <>
      <div className="chat-info">
        <span>我的消息</span>
      </div>
      <div className="chat-list">
        <List header='用户列表'>
          {users.map(user => (
            <SwipeAction
              key={user.name}
              rightActions={rightActions}
            >
              <List.Item
                key={user.name}

                prefix={
                  <Image
                    src={user.avatar}
                    style={{ borderRadius: 20 }}
                    fit='cover'
                    width={40}
                    height={40}
                  />
                }
                description={user.description}
              >
                {user.name}
              </List.Item>
            </SwipeAction>

          ))}
        </List>
      </div>


    </>
  )
}

export default ChatHome;
