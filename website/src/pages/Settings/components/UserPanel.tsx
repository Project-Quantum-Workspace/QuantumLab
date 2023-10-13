import {
  Avatar,
  Card,
  Input,
  Form,
  Typography,
} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { UserMetaData } from '@/utils/types/UserTypes';
import { message } from 'antd/lib';
import SubmitButton from './UserPanelSubmitBtn';
import AuthApi from '@/services/quantumlab/auth';

type UserPanelProps = {
  currUser: UserMetaData
}

const UserPanel = (props: UserPanelProps) => {
  const { Paragraph } = Typography
  const [form] = Form.useForm()
  const { currUser } = props;
  const [ isResettingPsw, setIsResettingPsw ] = useState(false)

  const onConfirm = () => {
    const formData = form.getFieldsValue()
    delete formData.confirmPassword
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { firstName, lastName, email, password, ...rest } = currUser
    const updatedData = {
      ...formData,
      ...rest
    }
    AuthApi.userUpdateInfo(updatedData).then(() => {
      message.success('Your changes have been updated!')
    })
    .catch((error) => { message.error(error.response.data.message) })
  }
  const roles: string[] = []
  currUser.roles?.map((role: { name: string; }) => roles.push(role.name))
  const initValues = {
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email,
    roles: roles.join(', '),
    accessLevel: currUser.accessLevel,
    password: ''
  }

  return (
    <Card title="User Panel" 
      bordered={false}
      style={{ height: '40rem', overflow: 'auto' }}
      headStyle={{ fontSize: '25px', fontFamily: 'Manrope', fontWeight: '600' }} 
    >
      <Paragraph>Used for tracking you</Paragraph>
      <div style={{ textAlign: 'center' }}>
        <Avatar 
          style={{ marginBottom: '1rem', width: '7rem', height: '7rem' }}
          src='https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
        />
        <Form 
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          form={form} 
          name="userPanel" 
          autoComplete="off"
          initialValues={initValues}>
          <Form.Item required label="User Name" style={{ marginBottom: 0 }}>
            <Form.Item
              name="firstName"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginRight: '1rem' }}
              rules={[{ required: true, message: 'Please input your first name!' }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              rules={[{ required: true, message: 'Please input your last name!' }]}>
                <Input />
            </Form.Item>
          </Form.Item>

          <Form.Item
          label="Email Address"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Role(s)" name="roles">
            <Input disabled prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item label="Access Permission" help="Authorise accessiility" name="accessLevel">
            <Input disabled prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item label="Reset Password">
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginRight: '1rem' }}
              name="password"
            >
              <Input.Password onChange={(e) => {
                setIsResettingPsw(e.target.value !== '')
              }} />
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                {
                  required: isResettingPsw, message: 'Please enter your password again!'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input placeholder="Confirm Password" />
            </Form.Item>
          </Form.Item>

          <SubmitButton form={form} onConfirm={onConfirm} /> 
        </Form>
      </div>
      
    </Card>
  )
}

export default UserPanel;