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
import { useState } from 'react';
import { Link } from 'umi';
const { Title } = Typography;
const { Option } = Select;

const NewWorkspaceForm = () => {
  const [form] = Form.useForm();

  type Params = {
    [key: string]: {
      fieldType: 'opt' | 'inputNum';
      options: Array<string | number>;
    };
  };

  const [templateParams, setTemplateParams] = useState<Params | null>(null);

  const handleTemplateSelect = async (value: string) => {
    // Fetch parameters for selected template
    try {
      const response = await fetch(`http://localhost:8080/template/get/${value}`);
      const data = await response.json();
      setTemplateParams(data); // Update the state with the fetched data
    } catch (error) {
      console.error('Fetch Error:', error);
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

        <Form.Item name="templates" label="Templates">
          <Select onSelect={handleTemplateSelect}>
            <Option value="template_1">Melbourne Cloud reasearch t1</Option>
            <Option value="template_2">Melbourne Cloud reasearch t2</Option>
          </Select>
        </Form.Item>

        {templateParams &&
          Object.keys(templateParams).map((key) => (
            <>
              <Divider />

              {/* parameters section */}
              <Title level={4}>Workspace Parameters</Title>

              <Form.Item key={key} name={key} label={key}>
                {templateParams[key].fieldType === 'opt' ? (
                  <Select>
                    {templateParams[key].options.map((option, index) => (
                      <Option key={index} value={option}>
                        {option}
                      </Option>
                    ))}
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
