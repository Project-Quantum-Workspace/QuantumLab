import TemplateApi from '@/services/quantumlab/template';
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
import { history, Link } from 'umi';
import useTemplateStore from '@/stores/TemplateStore';
import { TemplateClass } from '@/utils/types/TemplateTypes';
import { PageLoading } from '@ant-design/pro-components';
import React from 'react';
import AuthApi from '@/services/quantumlab/auth';
import { log } from 'debug';
import './newWorkspce.css';

const { Title } = Typography;
const { Option } = Select;
type UserType = {
  accessLevel: number;
  accountStatus: boolean;
  avatar: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  quantumlabToken: string;
  roles: {
    id: number;
    name: string;
  }[];
  uuid: string;
  workspaces: {
    createdAt: string;
    description: string;
    id: number;
    lastAccessed: string;
    name: string;
    parameters: string;
    state: string;
    tags: string;
    template: {
      accessLevel: number;
      filename: string;
      icon: string;
      id: number;
      parameters: string;
    };
    templateId: number;
    type: string;
    updatedAt: string;
    users: string[];
    uuid: string;
  }[];
};
const NewWorkspace = () => {
  // const history = useHistory();
  const [form] = Form.useForm();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateClass | undefined>(undefined);
  const [templates, setTemplates] = useState<TemplateClass[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [templatesFetchFailed, setTemplatesFetchFailed] = useState(false);
  const { initialState } = useModel('@@initialState');
  const { currentTemplate } = useTemplateStore();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    (async function () {
      try {
        const user = await AuthApi.currentUser();
        setCurrentUser(user);
        console.log(user);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }
    })();
  }, []);

  useEffect(() => {
    // Fetch templates
    TemplateApi.getAccessibleTemplates()
      .then((res) => {
        setLoadingTemplates(false);
        setTemplates(res);
      })
      .catch((error) => {
        setTemplatesFetchFailed(true);
        console.error('Error fetching templates:', error.message);
        notification.error({
          message: 'Error',
          description: 'Error fetching templates.',
          duration: 5,
        });
      });

    if (currentTemplate) setSelectedTemplate(currentTemplate);
  }, []);

  if (loadingTemplates) {
    return <PageLoading />;
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
    setSelectedTemplate(template);
  };

  const onFinish = async (values: any) => {
    if (!currentUser) {
      console.error('Current user data not available');
      return;
    }
    try {
      const parameters = selectedTemplate?.parameters.reduce<Record<string, any>>(
        (acc, question) => {
          acc[question.name] = values[question.name];
          return acc;
        },
        {},
      );

      const adjustedValues = {
        createdAt: new Date().toISOString(),
        description: values.description || 'string',
        id: 0, // hardcoded
        lastAccessed: new Date().toISOString(),
        name: values.name || 'string',
        parameters: JSON.stringify(parameters) || 'string',
        state: 'Running',
        tags:
          values.tags
            .split(',')
            .map((tag: string) => tag.trim())
            .join(',') || 'string',
        template: {
          accessLevel: selectedTemplate?.accessLevel || 0,
          filename: selectedTemplate?.filename || 'string',
          icon: selectedTemplate?.icon || 'string',
          id: selectedTemplate?.id || 0,
          parameters: JSON.stringify(parameters) || 'string',
        },
        templateId: selectedTemplate?.id || 0,
        type: values.type || 'string',
        updatedAt: new Date().toISOString(),
        users: [
          {
            accessLevel: currentUser.accessLevel,
            accountStatus: currentUser.accountStatus,
            avatar: currentUser.avatar,
            email: currentUser.email,
            firstName: currentUser.firstName,
            id: currentUser.id,
            lastName: currentUser.lastName,
            password: currentUser.password, // Revisit this as discussed before.
            quantumlabToken: currentUser.quantumlabToken,
            roles: currentUser.roles,
            uuid: currentUser.uuid,
            workspaces: currentUser.workspaces,
          },
        ],
        uuid: '0', // hardcoded
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
          history.push('/workspace');
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
        console.log(response);
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
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ template_id: selectedTemplate?.id }}
        className="workspace-form"
      >
        <Title level={3} className="workspace-title">
          Create a New Project
        </Title>
        <Title level={4} className="section-title">
          General
        </Title>

        {/* General Section */}
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input a name!' }]}
          className="form-item"
        >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          name="tags"
          label="Tag"
          rules={[{ required: true, message: 'At least ONE tag reqired!' }]}
          className="form-item"
        >
          <Input
            placeholder="Multiple tags accepted, separated by commas(,) please."
            className="form-input"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Description needed!' }]}
          className="form-item-textarea"
        >
          <Input.TextArea
            placeholder="Enter a detailed description of your workspace here..."
            className="form-textarea"
          />
        </Form.Item>

        <Divider className="section-divider" />

        {/* Workspace Type Section */}
        <Title level={4} className="section-title">
          Workspace Type
        </Title>

        <Form.Item name="type" label="Type" className="form-item">
          <Radio.Group size="large" className="radio-group">
            <Radio.Button value="standard" className="radio-button">
              Standard QuantumLab
            </Radio.Button>
            <Radio.Button value="flow" disabled className="radio-button">
              QuantumFlow(Unavailable Now)
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="template_id" label="Templates" className="form-item-select">
          <Select
            placeholder="Select a template"
            onChange={onTemplateChange}
            loading={!templates}
            className="form-select"
          >
            {templates ? (
              templates.map((template) => (
                <Option key={template.id} value={template.id} className="select-option">
                  {template.filename}
                </Option>
              ))
            ) : (
              <Option disabled className="select-option-loading">
                Loading templates...
              </Option>
            )}
          </Select>
        </Form.Item>

        {selectedTemplate &&
          selectedTemplate.parameters &&
          selectedTemplate.parameters.map((question, index) => (
            <React.Fragment key={question.name}>
              {index === 0 && (
                <>
                  <Divider className="parameters-divider" />
                  <Title level={4} className="section-title">
                    Workspace Parameters
                  </Title>
                </>
              )}
              <Form.Item name={question.name} label={question.label} className="form-item">
                {question.isInput ? (
                  <InputNumber min={0} step={1} className="input-number" />
                ) : (
                  <Select className="form-select">
                    {question.selections?.map((option: string, index: number) => (
                      <Option key={index} value={option} className="select-option">
                        {option}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </React.Fragment>
          ))}

        <Form.Item className="submit-buttons">
          <Button type="primary" htmlType="submit" className="submit-button">
            Submit
          </Button>
          <Link to="/workspace" className="go-back-link">
            <Button className="go-back-button">Go Back</Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewWorkspace;
