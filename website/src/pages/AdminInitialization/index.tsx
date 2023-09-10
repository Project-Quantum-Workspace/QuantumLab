import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  Result,
  message
} from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const AdminInitialization = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      // Assuming you have a backend API to save admin details
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setSubmitted(true);
        message.success('Admin account setup successful! Redirecting to login page...', 2); // Show success message for 2 seconds
        setSubmitted(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Handle error
        console.error('Error saving admin details');
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
            <Form.Item label="email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
              <Input.Password />
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