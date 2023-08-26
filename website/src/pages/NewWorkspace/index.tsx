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
import { Link } from 'umi';
const { Title } = Typography;
const { Option } = Select;

const NewWorkspaceForm = () => {
  const [form] = Form.useForm();

  type ParametersType = {
    [key: string]: {
      fieldType: 'opt' | 'num';
      options?: string[];
    };
  };

  type Template = {
    Id: number;
    Parameters: Record<string, any>; // Add this type definition
    Access_level: string;
    File_name: string;
  };

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    // function to fetch templates
    const fetchTemplates = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/template/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setTemplates(data.message); // set fetched templates to state
        } else {
          throw new Error(data.message || 'Error fetching templates.');
        }
      } catch (error) {
        console.error('Error:', error);
        notification.error({
          message: 'Error',
          description: 'An error occurred while fetching templates.',
          duration: 5,
        });
      }
    };

    // call the function to fetch templates
    fetchTemplates();
  }, []);

  const onTemplateChange = (value: number) => {
    const template = templates.find((template) => template.Id === value);
    if (template && typeof template.Parameters === 'string') {
      // Parse the Parameters from string to object
      const paramsObject = JSON.parse(template.Parameters);

      setSelectedTemplate({ ...template, Parameters: paramsObject });
    }
  };

  const onFinish = async (values: any) => {
    try {
      // Adjust data to fit the new format
      const adjustedValues = {
        createdAt: new Date().toISOString(),
        description: values.description,
        id: values.id,
        lastAccessed: new Date().toISOString(),
        name: values.name,
        parameters: values.parameters,
        state: values.state,
        tags: values.tags.split(',').map((tag: string) => tag.trim()),
        template_id: values.template_id,
        type: values.type,
        updatedAt: new Date().toISOString(),
        user_id: values.user_id,
      };

      const response = await fetch('http://localhost:8080/workspace/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adjustedValues),
        // Removed 'no-cors' mode, because we need to handle response body
      });

      const data = await response.json();

      if (response.status === 200) {
        notification.success({
          message: 'Success',
          description: data.message,
          duration: 3,
        });
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
          <Select placeholder="Select a template" onChange={onTemplateChange}>
            {templates.map((template) => (
              <Option key={template.Id} value={template.Id}>
                {template.File_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedTemplate &&
          selectedTemplate.Parameters &&
          Object.keys(selectedTemplate.Parameters).map((key) => (
            <>
              <Divider />
              <Title level={4}>Workspace Parameters</Title>
              <Form.Item name={key} label={key}>
                {selectedTemplate.Parameters[key].fieldType === 'opt' ? (
                  <Select>
                    {selectedTemplate.Parameters[key].options.map(
                      (option: string, index: number) => (
                        <Option key={index} value={option}>
                          {option}
                        </Option>
                      ),
                    )}
                  </Select>
                ) : (
                  <InputNumber />
                )}
              </Form.Item>
            </>
          ))}

        {/* <Form.Item name="region" label="What region should your workspace deploy in?">
          <Select>
            <Option value="qh2-uom">qh2-uom</Option>
            <Option value="qh2-uom2">qh2-uom2</Option>
          </Select>
        </Form.Item>

        <Form.Item label="What instance flavor should your workspace use?" name="flavor">
          <Select>
            <Option value="2 Cores CPU + 2G Memory(t3.small)">
              2 Cores CPU + 2G Memory(t3.small)
            </Option>
          </Select>
        </Form.Item>

        <Form.Item label="Which OS should your workspace use?" name="os">
          <Select>
            <Option value="NeCTAR Ubuntu 20.04 LTS (Focal) amd64 Helping text is here">
              NeCTAR Ubuntu 20.04 LTS (Focal) amd64 Helping text is here
            </Option>
          </Select>
        </Form.Item>

        <Form.Item label="Install JupyterLab?" name="jupyter">
          <Select>
            <Option value="true">true</Option>
            <Option value="false">false</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="How large would you like your persistent home volume to be (Gi)"
          name="volume"
        >
          <InputNumber min={1} step={1} max={100} />
        </Form.Item> */}
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

export default NewWorkspaceForm;
