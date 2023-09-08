import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Form, Input, Row, Select, Upload, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const DemoBox: React.FC<{ children: React.ReactNode; value: number }> = (props) => (
  <p className={`height-${props.value}`}>{props.children}</p>
);

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export default function index() {
  ////////////message
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Upload success',
    });
  };

  /////////////// API
  const url = 'https://my.api.mockaroo.com/data.json?key=e7cb8c20';
  const posturl = 'https://my.api.mockaroo.com/data2.json?key=e7cb8c20&__method=PUT';
  const test = '/test.json';

  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    // other form fields
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    axios
      .put(posturl, formData) // Replace with your API endpoint

      .then((response) => {
        setStatusMessage('Form data updated successfully.');
      })

      .catch((error) => {
        setStatusMessage('An error occurred while updating the form data.');
      });
  };

  //////////////////

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  //////
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/admin/adminView');
  };

  return (
    <div>
      <div></div>

      <div className="container">
        <Row gutter={[80, 0]}>
          <Col span={6}>
            <div className="avatar">
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
          </Col>

          <Col span={15}>
            <div className="userInfor">
              <h2>Update User Information</h2>
              <Divider orientation="left"></Divider>
              <Form form={form} size="large" layout="vertical">
                <Row>
                  <Col span={10}>
                    <Form.Item label="User Name:">
                      <Input
                        placeholder="new user name"
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={48}>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="First Name:">
                      <Input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="Last Name:">
                      <Input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={10}>
                    <Form.Item label="Email:">
                      <Input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={48}>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="New Password:">
                      <Input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <Form.Item label="Confrim Password:">
                      <Input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={48}>
                  <Col className="gutter-row" span={4}>
                    <Form.Item label="Access Level:">
                      <Select>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col className="gutter-row" span={4}>
                    <Form.Item label="Account Status:">
                      <Select>
                        <Select.Option value="1">1</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col className="gutter-row" span={4}>
                    <Form.Item label="Role">
                      <Select>
                        <Select.Option value="Student">Student</Select.Option>
                        <Select.Option value="Admin">Admin</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <br></br>
                <Row gutter={8}>
                  <Col offset={5} className="gutter-row" span={2}>
                    <Form.Item>
                      <DemoBox value={10}>
                        <Button onClick={handleFormSubmit}>Submit</Button>
                      </DemoBox>
                    </Form.Item>
                  </Col>
                  <Col offset={2} className="gutter-row" span={2}>
                    <Button type="primary" onClick={handleNavigation}>
                      Back
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
