import {
  Avatar,
  Button,
  Card,
  Input,
  Form,
  Select,
  Typography,
  Result,
} from 'antd';
import type { SelectProps } from 'antd';
import { ArrowLeftOutlined, FrownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { UserMetaData } from '@/utils/types/UserTypes';
import { message } from 'antd/lib';
import SubmitButton from '../Settings/components/UserPanelSubmitBtn';
import AuthApi from '@/services/quantumlab/auth';
import { history, useParams } from '@umijs/max';
import { PageLoading } from '@ant-design/pro-components';


const UserPanel = () => {
  const { Paragraph } = Typography
  const [form] = Form.useForm()
  const [ isResettingPsw, setIsResettingPsw ] = useState(false)
  const [user, setUser] = useState<UserMetaData|undefined>(undefined)
  const [userRoles, setUserRoles] = useState<SelectProps['options']>([])
  const [loading, setLoading] = useState(true)
  
  const { userId } = useParams()
  useEffect(() => {
    AuthApi.adminGetUser(userId as string).then((res) => {
      setUser(res)
      setLoading(false)
    })
    .catch((error)=> {
      message.error(error.response.data.message);
    })
  }, [])

  useEffect(() => {
    AuthApi.adminGetRoles().then((res) => {
      if(Array.isArray(res)) {
        const options: SelectProps['options'] = []
        res.map((r) => {
          return options.push({
            label: r.name,
            value: r.name,
          });
        })
        setUserRoles(options)
      }
      //setLoading(false)
    })
    .catch((error)=> {
      message.error(error.response.data.message);
    })
  }, [])

  const onConfirm = () => {
    const formData = form.getFieldsValue()
    delete formData.confirmPassword
    if(user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { firstName, lastName, email, accessLevel, password, ...rest } = user
      const updatedData = {
        ...formData,
        ...rest
      }
      AuthApi.adminUpdateInfo(updatedData).then(() => {
        message.success('Your changes have been updated!')
      })
      .catch((error) => { message.error(error.response.data.message) })
    }
    
  }
  
  const roles: string[] = []
  user?.roles?.map((role: { name: string; }) => roles.push(role.name))
  const initValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    roles: roles.join(', '),
    accessLevel: user?.accessLevel,
    password: ''
  }

  const handleBack = () => {
    history.push('/admin/users')
  }

  const options: SelectProps['options'] = [];

  for (let i = 1; i <= 10; i++) {
    options.push({
      label: i,
      value: i,
    });
  }

  if(loading)
  return <PageLoading />

  if (user)
  return (
    <>
    <div>
      <Button 
        type="text" 
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
        style={{
          color: '#0F56B3',
          padding: 0,
          left: 0
        }}
      >
        Back to User List
      </Button>
      </div>
      <Card title="User Panel" 
        bordered={false}
        style={{ height: '40rem', overflow: 'auto' }}
        headStyle={{ fontSize: '25px', fontFamily: 'Manrope', fontWeight: '600' }} 
      >
        <Paragraph>Update User Information</Paragraph>
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

            <Form.Item 
              label="Role(s)" 
              name="roles"
              rules={[{ required: true, message: 'Please select user role!' }]}>
              <Select options={userRoles} />
            </Form.Item>

            <Form.Item
              label="Access Permission"
              help="Authorise accessiility"
              name="accessLevel"
              rules={[{ required: true, message: 'Please select user access permission!' }]}>
              <Select options={options} />
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
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>
            </Form.Item>

            <SubmitButton form={form} onConfirm={onConfirm} /> 
          </Form>
        </div>
        
      </Card>
    </>
    
  )
  return ( <Result
    icon={<FrownOutlined />}
    title="User Not Found"
  />)
}

export default UserPanel;
