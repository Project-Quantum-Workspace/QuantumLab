import React, { useState } from 'react'
import { CloudUploadOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { Link } from '@umijs/max';

import { TemplateCol } from './components/FormItems';

//CT_TODO: delete this after backend integration
const templateParameter = "[{\"name\":\"availableZone\",\"label\":\"Available Zone\",\"selections\":[\"qh2\",\"qh2-uom\"],\"isInput\":false, \"value\":\"qh2\"},{\"name\":\"diskSize\",\"label\":\"Disk Size\",\"isInput\":true,\"value\":\"30\"}]";
const iconList1: Array<{ value: string, label: string }> = [
  { value: '/unimelb', label: 'Unimelb Icon' },
  { value: '/quantumLab', label: 'QuantumLab Icon' },
]
//CT_TODO: put this to the /utils/types once the data type is settled 
export type JsonData = {
  name: string;
  label: string;
  selections?: string[];
  isInput: boolean;
  value:string;
};

const CreateTemplate: React.FC = () => {
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState("");
  const [iconList, setIconList] = useState<Array<{ value: string, label: string }>>(iconList1);
  const [displayP, setDisplayP] = useState(0);
  const [params, setParams] = useState<JsonData[]>([])


  const props: UploadProps = {
    beforeUpload: (file) => {
      const isTar = file.type === 'application/x-tar';
      if (!isTar) {
        message.error(`${file.name} is not a tar file`);
      }
      return isTar || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      setDisplayP(info.fileList?.length)
      setFileData(templateParameter)
      if (fileData) {
        //CT_TODO: post the file and parse the recieved json string here
        const params = JSON.parse(fileData);
        console.log(params)
        setParams(params);
      }
    }

  };
  //CT_TODO: get icon list
  //CT_TODO: upload info to backend
  const onFinish = async (t: any) => {
    console.log(t)
    const template = {
      filename: t.filename,
      parameters: JSON.stringify(params),
      accessLevel: t.accessLevel,
      icon: t.icon
    }
    //const res = await TemplateApi.postTemplate(template)
    console.log(template)
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
          rules={[{ required: true, message: 'Please enter the template name'},
        ()=>({
          validator(_,value){
            const pattern = /^[a-zA-Z0-9-]+$/
           if(pattern.test(value)){
            return Promise.resolve();
           }
           return Promise.reject(new Error("Name must start with letters and contain only lowercase letters, uppercase letters, numbers and '-'"));
          }
        })]}
         >
          <Input />
        </Form.Item>

        <Form.Item label="Upload template"
          name="file">
          <Form.Item name="Upload template" label="Upload template" valuePropName="file" rules={[{ required: true, message: 'Please upload your template format' }]} noStyle>
            <Upload.Dragger {...props} name="files" maxCount={1} action="/upload.do">
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">Upload template file</p>
              <p className="ant-upload-hint">You can click or drop your .tar file to this area to upload.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        {/**CT_TODO: select icon, Icon should display when hover*/}
        <Form.Item name="icon" label="Icon" >
          <Select
            defaultValue={"QuantumLab"} options={iconList}
          />

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
            {params.map((p) =>
              <TemplateCol key={p.name} data={p} />
            )}

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
              type="primary"
              style={{
                backgroundColor: '#0F56B3',
              }}
              htmlType="submit">
              Create Template
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default CreateTemplate