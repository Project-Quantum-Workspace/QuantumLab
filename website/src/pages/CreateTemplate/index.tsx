import React, { useEffect } from 'react'
import { CloudUploadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Slider,
  Space,
  TreeSelect,
  Upload,
} from 'antd';


const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const CreateTemplate: React.FC = () => {
  //TODO: upload info to backend
  useEffect(()=>{

  },[])
  return (
    <>
      <h1>
        Create A New Template
      </h1>
      <Form
        labelCol={{ flex: '20%' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <h2>General</h2>
        <Form.Item label="Display Name"
          rules={[{ required: true, message: 'Please enter display name of this template' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Template Name"
          rules={[{ required: true, message: 'Please enter the template name' }]}
          extra="Name must start with letters and contain only lowercase letters, uppercase letters, numbers and '-'">
          <Input />
        </Form.Item>

        <Form.Item label="Upload template"
          rules={[{ required: true, message: 'Please upload your template format' }]}
        >
          <Form.Item name="upload template" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">Upload template file</p>
              <p className="ant-upload-hint">You can click or drop your .tar file to this area to upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        {/** TODO: select icon, Icon should display when hover 
         * UPDATE: should have default value when admin didn't select this field
        */}
        <Form.Item label="Icon" valuePropName="fileList" getValueFromEvent={normFile}>
          <TreeSelect >

          </TreeSelect>

        </Form.Item>

        <Divider />
        <h2>Permission</h2>
        <Form.Item label="Access Level">
        <InputNumber min={0} max={10}  />
        </Form.Item>
        <Divider />

        {/** TODO: parse tar file */}

        <Divider />
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Button>
              Cancel
            </Button>
            <Button>
              Create Template
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateTemplate