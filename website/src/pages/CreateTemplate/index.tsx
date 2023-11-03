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
import * as yaml from 'js-yaml';
import { Link } from '@umijs/max';
import TemplateApi from '@/services/quantumlab/template';
import { TemplateCol } from './components/FormItems';
import TextArea from 'antd/es/input/TextArea';
import { TemplateField } from '@/utils/types/TemplateTypes';
import { history } from 'umi';
//CT_TODO: delete this after backend integration

const iconList1: Array<{ value: string, label: string }> = [
  { value: '/unimelb', label: 'Unimelb Icon' },
  { value: '/quantumLab', label: 'QuantumLab Icon' },
]
//CT_TODO: put this to the /utils/types once the data type is settled 


function fileToBytes(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result !== "string") {
        reject(new Error("Unexpected result type"));
      } else {
        resolve(result);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
const CreateTemplate: React.FC = () => {
  const [form] = Form.useForm();
  const [fileData, setFileData] = useState<string | null>(null);
  const [iconList, setIconList] = useState<Array<{ value: string, label: string }>>(iconList1);
  const [params, setParams] = useState("")
  const [jsonData, setJsonData] = useState<TemplateField[]|undefined>(undefined)


  const fileProps: UploadProps = {
    beforeUpload: async (file) => {
      console.log(file.type)
      const isTar = file.type === 'application/x-tar';
      if (!isTar) {
        message.error(`${file.name} is not a tar file`);
      }
      const bytes = await fileToBytes(file)
      setFileData(bytes.split(',')[1])

      return isTar || Upload.LIST_IGNORE;
    },
    

  };
  const enterParam=(e: { target: { value: React.SetStateAction<string>; }; })=>{
    setParams(e.target.value)
    setJsonData(undefined)
  }
  const parseParam = () => {
    
    try {
      const yamldata = yaml.load(params)
      const d = JSON.parse(JSON.stringify(yamldata));
      setJsonData(d["template"])
      if(d["template"].length!==0){
        notification.success({
          message: 'Success',
          description: "Successfully parse parameters",
          duration: 3,
        });
      }else{
        throw new Error("Invalid input")
      }
      
    } catch (error) {
      
      notification.error({
        message: 'Error',
        description: 'Fail to parse Yaml, please check your format',
        duration: 5,
      });
      return;
    }

  }


  //CT_TODO: get icon list
  //CT_TODO: upload info to backend
  const onFinish = async (t: any) => {
    
    const template = {
      filename: t.filename,
      parameters: JSON.stringify(jsonData),
      accessLevel: t.accessLevel,
      tfFile: fileData,
    }
    console.log(template)
    const res = await TemplateApi.postTemplate(template)
    if (res.message === "success") {
      notification.success({
        message: 'Success',
        description: res.message,
        duration: 3,
      });
      setTimeout(() => {
        history.push('/workspace');
      }, 3000);

    }else{
      notification.error({
        message: 'Error',
        description: 'Fail to create, please check your input',
        duration: 5,
      });
      return;
    
    }

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
          rules={[{ required: true, message: 'Please enter the template name' },
          () => ({
            validator(_, value) {
              const pattern = /^[a-zA-Z0-9-]+$/
              if (pattern.test(value)) {
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
        <Form.Item name='parameters' label='Parameters' rules={[{ required: true, message: 'Please upload your template parameters' }]}>
          <TextArea
            value={params}
            rows={10}
            onChange={enterParam} showCount />
           
        </Form.Item>
        <Button
              type="primary"
              style={{
                marginLeft:'25%',
                backgroundColor: '#0F56B3',
              }}
              onClick={parseParam}>
              Parse
            </Button>

        <Divider />
        <h2>Permission</h2>
        <Form.Item name="accessLevel" label="Access Level"
          extra="Any user with greater or equal to access level can use this template to create workspaces.">
          <InputNumber min={0} max={10} defaultValue={0} />
        </Form.Item>
        {jsonData &&
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