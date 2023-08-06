import { StatusType, ToolsetItemType, ToolsetType } from "../utils/types/projectItemTypes";
import Toolset from "./components/ToolsetComponent";
import ProjectItemIcon from '../../../assets/projectImg1.svg';
import {
  Button,
  Col,
  Divider, 
  Image,
  Row, 
  Space,
  Typography
} from 'antd';
import './WorkspaceInfoPage.css';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import ProjectStatus from "../components/ProjectStatus";

const WorkspaceInfo: React.FC = () => {
  const { Title, Text, Paragraph } = Typography;

  const toolsets: ToolsetItemType[] = [
    {
      type: ToolsetType.Jupyter,
      link: 'https://workspace-1.dev.quantumlab.cloud/?folder=/home/ccc/workspace-test',
    },
    {
      type: ToolsetType.VSCode,
    },
    {
      type: ToolsetType.Terminal,
    },
  ];

  const projectItem = {
    icon: ProjectItemIcon,
    name: 'MRC Example Project',
    description: '',
    owner: 'Lois',
    createDate: 'April 23, 2023',
    lastAccessedDate: '5 hours ago',
    template: 'Melbourne Research Cloud QC Template 1',
    status: StatusType.Running,
    tags: ['Linux', 'Qiskit', 'Bracket'],
    parameters: {
      openstack_cloud_server: 'MRC_Instance',
      'Available Zone': 'qh2-uom',
      'Instance Type': '2 Cores CPU + 2 G Memory(t3.small)',
      'Instance OS': 'NeCTAR Ubuntu 20.04 LTS (Focal) amd64',
      openstack_cloud_volume: 'MRC_Volume',
      'Disk Size': '50G',
    },
    toolsets: toolsets,
  };

  const renderParam = (key: string, value: string) => {
    return (
      <div className="param-item">
        <Row>
          <Col>
            <Title className="param-item-value">{value}</Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text className="param-item-key">{key}</Text>
          </Col>
        </Row>
      </div>
    );
  };

  const renderToolset = (toolset: ToolsetItemType) => {
    return <Toolset type={toolset.type} link={toolset.link} />;
  };

  const handleBack = () => {
    history.push('/workspace');
  };
  
  return (
    <>
      <div>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          style={{
            color: '#0F56B3',
            padding: 0
          }}
        >
          Back to My Project
        </Button>
      </div>

      <Space>
        <Image
          width={96}
          height={96}
          src={ProjectItemIcon}
        />
        <div>
          <Row>
            <Col>
              <Title className="project-info-name">{projectItem.name}</Title>
            </Col>
          </Row>
          <Row>
            <Space size='large'>
              <>
                <Title className="project-info-subtitle">{"Status: "}
                </Title>
                <ProjectStatus status={projectItem.status} margin={true}/>
              </>
              <Title className="project-info-subtitle">{"Owner: " + projectItem.owner}</Title>
              <Title className="project-info-subtitle">{"Template: " + projectItem.template}</Title>
            </Space>
          </Row>
        </div>
      </Space>

      <Divider />

      <div>
        <Title level={3}>
          Description
        </Title>
        <Paragraph>{projectItem.description}</Paragraph>
      </div>

      <Divider />

      <div>
        <Title level={3}>
          Overview
        </Title>
        <Paragraph>
          Inspect default and custome metadata for this workspace
        </Paragraph>
        <div>
          {Object.entries(projectItem.parameters).map(([key, value]) =>
            renderParam(key, value),
          )}
        </div>
      </div>

      <Divider />

      <div>
        <Title level={3}>
          Toolset
        </Title>
        <Paragraph>
          Utilize the predefined toolset for your development
        </Paragraph>
        <div>
          {Object.entries(projectItem.toolsets).map(([key, toolset]) =>
            renderToolset(toolset)
          )}
        </div>
      </div>

      
    
    </>
  )
}

export default WorkspaceInfo