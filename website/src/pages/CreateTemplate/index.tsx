import React, { useEffect, useState } from 'react'
import { CloudUploadOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Space,
  TreeSelect,
  Upload,
  UploadProps,
  message,
} from 'antd';
import TemplateApi from "@/services/quantumlab/template";
import { Link } from '@umijs/max';

const templateParameter = "[{\"name\":\"availableZone\",\"label\":\"Available Zone\",\"selections\":[\"qh2\",\"qh2-uom\"],\"isInput\":false},{\"name\":\"diskSize\",\"label\":\"Disk Size\",\"isInput\":true}]";
type Question = {
  name: string;
  label: string;
  selections?: string[];
  isInput: boolean;
};

const CreateTemplate: React.FC = () => {
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState("");
  const [icon, setIcon] = useState(null);
  const [displayP, setDisplayP] = useState(0);
  const [params, setParams] = useState<Question[]>([])

  
  const props: UploadProps = {
    beforeUpload: (file) => {
      const isTar = file.type === 'image/png';
      if (!isTar) {
        message.error(`${file.name} is not a tar file`);
      }
      return isTar || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      setDisplayP(info.fileList?.length)
      setFileData(templateParameter)
      if (fileData) {
        const params = JSON.parse(fileData);
        setParams(params);
      }
    }

  };
  //TODO: upload info to backend
  const onFinish = async (t: any) => {
    console.log(t)
    const template = {
      filename: t.filename,
      parameters: '[{"name":"AvailableZone","label":"Available Zone","selections":["qh2","qh2-uom"],"isInput":false},{"name":"DiskSize","label":"Disk Size","isInput":true}]',
      accessLevel: t.accessLevel,
      icon: t.icon
    }
    //const res = await TemplateApi.postTemplate(template)
    //console.log(res)
  }
  return (
    <>
      <h1>
        Create A New Template
      </h1>
      <Form
      name="create Template"
        form={form}
        labelCol={{ flex: '25%' }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <h2>General</h2>
        <Form.Item name="filename" label="Display Name"
          rules={[{ required: true, message: 'Please enter display name of this template' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Template Name"
          name="templatename"
          rules={[{ required: true, message: 'Please enter the template name' }]}
          extra="Name must start with letters and contain only lowercase letters, uppercase letters, numbers and '-'">
          <Input />
        </Form.Item>

        <Form.Item label="Upload template"
          name="file">
          <Form.Item name="Upload template" label="Upload template" valuePropName="file" rules={[{ required: true, message: 'Please upload your template format' }]}noStyle>
            <Upload.Dragger {...props} name="files" maxCount={1} action="/upload.do">
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
        <Form.Item name="icon" label="Icon" >
          <TreeSelect >

          </TreeSelect>

        </Form.Item>

        <Divider />
        <h2>Permission</h2>
        <Form.Item name="accessLevel" label="Access Level"
          extra="Any user with greater or equal to access level can use this template to create workspaces.">
          <InputNumber min={0} max={10} defaultValue={0} />
        </Form.Item>
        {displayP === 1 && params.length !== 0 &&
          <><Divider />
            <h2>Workspace Parameters</h2>
            {/** TODO: parse tar file */}


            <Divider />
          </>}
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Space>
            <Link to="/workspace">
              <Button>
                Cancel
              </Button>
            </Link>
            <Button
              type="primary" htmlType="submit">
              Create Template
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateTemplate