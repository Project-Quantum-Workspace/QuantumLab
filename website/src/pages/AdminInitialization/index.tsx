import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Result,
  message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { BaseApi } from '@/utils/BaseApi';

const { Title, Paragraph } = Typography;

const AdminInitialization = ({ hasUser }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () =>{
    try {

      // Assuming you have a backend API to save admin details
      const response = await fetch('/api/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // 将用户输入的邮箱和密码发送给服务器
      });

      if (response.ok) {
        setSubmitted(true);
        message.success('Admin account setup successful! Redirecting to login page...', 2);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        console.error('Error setting up admin account');
        message.error('Failed to set up admin account. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-initialization">
      <Typography>
        <Title>Welcome to our platform!</Title>
        {!submitted ? (
          <Form onFinish={handleSubmit}>
            <Paragraph>
              We are excited to have you on board. Please provide your email and password to set up your admin account.
            </Paragraph>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
              <Input.Password
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Result
            status="success"
            title="Admin Account Setup"
            subTitle="Your admin account has been successfully set up. You will be redirected to the login page."
          />
        )}
      </Typography>
    </div>
  );
};

export default AdminInitialization;
