import { getAccessibleTemplates } from '@/services/quantumlab/template';
import { useModel } from '@umijs/max';
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Typography,
  notification,
} from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'umi';

const { Title } = Typography;
const { Option } = Select;

const NewWorkspace = () => {
  const [form] = Form.useForm();

  type Question = {
    name: string;
    label: string;
    selections?: string[];
    isInput: boolean;
  };

  type Template = {
    accessLevel: string;
    filename: string;
    parameters: string;
    id: number; // Assuming an ID is part of the template
  };

  type Template2 = {
    accessLevel: string;
    filename: string;
    parameters: Question[];
    id: number; // Assuming an ID is part of the template
  };

  const [selectedTemplate, setSelectedTemplate] = useState<Template2 | null>(null);

  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [templatesFetchFailed, setTemplatesFetchFailed] = useState(false);
  const { initialState } = useModel('@@initialState');
  const location = useLocation();
  const [templateId, setTemplateId] = useState(0)

  useEffect(() => {
    // function to fetch templates
    getAccessibleTemplates()
    .then((res)=>{
      setLoadingTemplates(false)
      setTemplates(res)
    })
    .catch((error)=>{
      setTemplatesFetchFailed(true)
      throw new Error(error.message || 'Error fetching templates.');
    })
   
  }, []);

  useEffect(()=> {
    
    if(location.state){
      setTemplateId( location.state.templateId);
    }
    
    const template = templates.find((template) => template.id === templateId);
    if (template && typeof template.parameters === 'string') {
      // Parse the Parameters from string to object
      const paramsObject = JSON.parse(template.parameters);
      setSelectedTemplate({ ...template, parameters: paramsObject });
    }
  },[templates])
  
  if (loadingTemplates) {
    return <div>Loading templates...</div>;
  }

  if (templatesFetchFailed) {
    return (
      <div style={{ padding: '20px' }}>
        <Title type="danger">An error occurred while fetching templates. Please try again.</Title>
        <Button
          type="primary"
          onClick={() => window.location.reload()}
          style={{ marginLeft: '10px' }}
        >
          Refresh Page
        </Button>
      </div>
    );
  }

  const onTemplateChange = (selectedTemplateId: number) => {
    const template = templates.find((template) => template.id === selectedTemplateId);
    if (template && typeof template.parameters === 'string') {
      // Parse the Parameters from string to object
      const paramsObject = JSON.parse(template.parameters);
      setSelectedTemplate({ ...template, parameters: paramsObject });
    }
  };

  const onFinish = async (values: any) => {
    try {
      // console.log('values:', values);

      // Create parameters from selectedTemplate and form values
      const parameters = selectedTemplate?.parameters.reduce<Record<string, any>>(
        (acc, question) => {
          acc[question.name] = values[question.name];
          return acc;
        },
        {},
      );
      console.log('parameters:', parameters);
      
      // Adjust data to fit the new format
      const adjustedValues = {
        userId: initialState?.currentUser?.id,
        workspace: {
          createdAt: new Date().toISOString(),
          description: values.description || 'string',
          id: 111,
          lastAccessed: new Date().toISOString(),
          name: values.name || 'string',
          parameters: JSON.stringify(parameters) || 'string',
          state: 'Running',
          tags:
            values.tags
              .split(',')
              .map((tag: string) => tag.trim())
              .join(',') || 'string',
          templateId: selectedTemplate?.id || 0,
          type: values.type || 'string',
          updatedAt: new Date().toISOString(),
        },
      };

      console.log('adjustedValues:', adjustedValues);

      const response = await fetch('/api/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(adjustedValues),
      });

      const data = await response.json();

      if (response.status === 201) {
        notification.success({
          message: 'Success',
          description: data.message,
          duration: 3,
        });
        setTimeout(() => {
          <Link to="/workspace" />;
        }, 3000);
      } else if (response.status === 400) {
        notification.error({
          message: 'JSON Parse Error',
          description: data.message,
          duration: 5,
        });
      } else if (response.status === 500) {
        notification.error({
          message: 'Database Query Error',
          description: data.message,
          duration: 5,
        });
      } else {
        console.log(response)
        notification.error({
          message: 'Error',
          description: 'An unknown error occurred.',
          duration: 5,
        });
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      notification.error({
        message: 'Error',
        description: 'An error occurred while processing your request.',
        duration: 5,
      });
    }
  };

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Title level={3}>Create a New Project</Title>
        <Title level={4}>General</Title>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input a name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="tags"
          label="Tag"
          rules={[{ required: true, message: 'At least ONE tag reqired!' }]}
        >
          <Input placeholder="Multiple tags accepted, separated by commas(,) please." />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Description needed!' }]}
        >
          <Input.TextArea placeholder="Enter a detailed description of your workspace here..." />
        </Form.Item>

        <Divider />

        {/* type section */}
        <Title level={4}>Workspace Type</Title>

        <Form.Item name="type" label="Type">
          <Radio.Group size="large">
            <Radio.Button value="standard">Standard QuantumLab</Radio.Button>
            <Radio.Button value="flow" disabled>
              QuantumFlow(Unavailable Now)
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="template_id" label="Templates">
          <Select
            defaultValue={templateId===0 ? undefined :templateId}
            placeholder="Select a template"
            onChange={onTemplateChange}
            loading={!templates} // Show loading indicator if templates are not available
          >
            {templates ? (
              templates.map((template) => (
                <Option key={template.id} value={template.id}>
                  {template.filename}
                </Option>
              ))
            ) : (
              <Option disabled>Loading templates...</Option>
            )}
          </Select>
        </Form.Item>

        {selectedTemplate &&
          selectedTemplate.parameters &&
          selectedTemplate.parameters.map((question, index) => (
            <>
              {index === 0 && (
                <>
                  <Divider />
                  <Title level={4}>Workspace Parameters</Title>
                </>
              )}
              <Form.Item name={question.name} label={question.label}>
                {question.isInput ? (
                  <InputNumber min={0} step={1} />
                ) : (
                  <Select>
                    {question.selections?.map((option: string, index: number) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </>
          ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Link to="/workspace">
            <Button>Go Back</Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewWorkspace;
