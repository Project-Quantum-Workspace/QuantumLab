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
  notification,
} from 'antd';

import { Link } from '@umijs/max';
import TemplateApi from '@/services/quantumlab/template';
import { TemplateCol } from './components/FormItems';
import TextArea from 'antd/es/input/TextArea';
import { event } from 'cypress/types/jquery';

//CT_TODO: delete this after backend integration
const templateParameter = "{\"template\":[{\"default\":\"s-1vcpu-1gb\",\"description\":\"Which Droplet configuration would you like to use?\",\"droplet size\":null,\"isInput\":false,\"name\":\"Droplet size\",\"selections\":[{\"name\":\"1 vCPU, 1 GB RAM\",\"value\":\"s-1vcpu-1gb\"},{\"name\":\"1 vCPU, 2 GB RAM\",\"value\":\"s-1vcpu-2gb\"},{\"name\":\"2 vCPU, 2 GB RAM\",\"value\":\"s-2vcpu-2gb\"},{\"name\":\"2 vCPU 4 GB RAM\",\"value\":\"s-2vcpu-4gb\"}],\"type\":\"selection\"},{\"default\":5,\"description\":\"How large would you like your home volume to be (in GB)?\",\"home volume size\":null,\"isInput\":true,\"name\":\"Home volume size\",\"type\":\"number\",\"validation\":{\"max\":20,\"min\":1}},{\"default\":\"sgp1\",\"description\":\"This is the region where your workspace will be created.\",\"isInput\":false,\"name\":\"Region\",\"region\":null,\"selections\":[{\"name\":\"New York 1\",\"value\":\"nyc1\"},{\"name\":\"Melbourne\",\"value\":\"melb\"}],\"type\":\"selection\"}]}"
const iconList1: Array<{ value: string, label: string }> = [
  { value: '/unimelb', label: 'Unimelb Icon' },
  { value: '/quantumLab', label: 'QuantumLab Icon' },
]
//CT_TODO: put this to the /utils/types once the data type is settled 
export type JsonData = {
  name: string;
  description:string;
  default?:string;
  type:string;
  label: string;
  selections?: string[];
  isInput: boolean;
  validation?:string[];
};
function fileToBytes(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
          const result = event.target?.result;
          if (typeof result === "string") {
              reject(new Error("Unexpected result type"));
          } else {
              resolve(new Uint8Array(result as ArrayBuffer));
          }
      };
      
      reader.onerror = (error) => {
          reject(error);
      };
      
      reader.readAsArrayBuffer(file);
  });
}
const CreateTemplate: React.FC = () => {
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState<Uint8Array|null>(null);
  const [iconList, setIconList] = useState<Array<{ value: string, label: string }>>(iconList1);
  const [displayP, setDisplayP] = useState(0);
  const [params, setParams] = useState(templateParameter)
  const [jsonData, setJsonData]=useState<JsonData[]>([])


  const fileProps: UploadProps = {
    beforeUpload: async (file) => {
      console.log(file.type)
      const isTar = file.type === 'application/x-tar';
      if (!isTar) {
        message.error(`${file.name} is not a tar file`);
      }
      const bytes = await fileToBytes(file)
      setFileData(bytes)
      console.log(bytes)
      return isTar || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      setDisplayP(info.fileList?.length)
      //const fileBytes: Uint8Array = new Uint8Array(info.fileList[0]);
      
      
    }

  };
  const uploadParam=async (e: { target: { value: React.SetStateAction<string>; } })=>{
   
    setParams(e.target.value);
    if(params){
      
      const d = JSON.parse(params);
      setJsonData(d["template"])
      
    }
          
  }
  

  //CT_TODO: get icon list
  //CT_TODO: upload info to backend
  const onFinish = async (t: any) => {
    
    const template = {
      filename: t.filename,
      parameters: JSON.stringify(jsonData),
      accessLevel: t.accessLevel,
      //tfFile:fileData,
    }
    const res = await TemplateApi.postTemplate(template)
    console.log(Buffer.from(res))
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
          <Form.Item name="Upload template" label="Upload template" valuePropName="file" rules={[{ required: true, message: 'Please upload your tf file' }]} noStyle>
            <Upload.Dragger {...fileProps} name="files" maxCount={1} action="/upload.do">
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
        <Form.Item name='parameters' label='Parameters'rules={[{ required: true, message: 'Please upload your template parameters' }]}>
        <TextArea 
        value={params}
        onChange={uploadParam} showCount />
        </Form.Item>
        

        <Divider />
        <h2>Permission</h2>
        <Form.Item name="accessLevel" label="Access Level"
          extra="Any user with greater or equal to access level can use this template to create workspaces.">
          <InputNumber min={0} max={10} defaultValue={0} />
        </Form.Item>
        {jsonData.length !== 0 &&
          <><Divider />
            <h2>Workspace Parameters</h2>
            {jsonData.map((p) =>
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