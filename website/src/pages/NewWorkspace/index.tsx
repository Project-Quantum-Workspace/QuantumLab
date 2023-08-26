import { Button, Divider, Form, Input, InputNumber, Radio, Select, Typography } from 'antd';
import { Link } from 'umi';
const { Title } = Typography;
const { Option } = Select;

interface FormValues {
  name: string;
  password: string;
  bio: string;
  checkbox: boolean;
  date: Date | null;
  radio: string;
  select: string;
}

const NewWorkspaceForm = () => {
  const [form] = Form.useForm();

  // const handleSubmit = (values: FormValues) => {
  //   // Here you can handle your form values
  //   console.log('Received values of form: ', values);
  // };
  const onFinish = (values: any) => {
    console.log(values);
  };

  // const handleGoBack = () => {
  //   history.back();
  // };

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Title level={3}>Create a New Project</Title>
        <Title level={4}>General</Title>
        <Form.Item name="name" label="Name" rules={[{ message: 'Please input a name!' }]}>
          <Input placeholder="name" />
        </Form.Item>

        <Form.Item name="tag" label="Tag" rules={[{ message: 'Please input a tag!' }]}>
          <Input placeholder="tag" />
        </Form.Item>

        <Form.Item name="description" label="description">
          <Input.TextArea placeholder="description" />
        </Form.Item>

        <Divider />

        <Title level={4}>Workspace Type</Title>

        <Form.Item name="Type" label="Type">
          <Radio.Group size="large">
            <Radio.Button value="a">Standard QuantumLab</Radio.Button>
            <Radio.Button value="b" disabled>
              QuantumFlow(Unavailable Now)
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="Templates" label="Templates">
          <Select>
            <Option value="t1">Melbourne Cloud reasearch t1</Option>
            <Option value="t2">Melbourne Cloud reasearch t2</Option>
          </Select>
        </Form.Item>

        <Divider />

        <Title level={4}>Workspace Parameters</Title>

        <Form.Item name="region" label="What region should your workspace deploy in?">
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
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Link to="/workspace">
            <Button >Go Back</Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewWorkspaceForm;
