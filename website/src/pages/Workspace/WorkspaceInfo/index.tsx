import { 
  ToolsetItemType, 
  ToolsetType, 
  WorkspaceInfoDTO,
  WorkspaceInfoClass
} from "../utils/types/WorkspaceTypes";
import Toolset from "./components/ToolsetComponent";
import ProjectItemIcon from '../../../assets/projectImg1.svg';
import {
  Button,
  Col,
  Divider, 
  Image,
  message,
  Row, 
  Space,
  Typography,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useIntl, useParams } from '@umijs/max';
import ProjectStatus from "../components/ProjectStatus";
import { getWorkspace } from "@/services/quantumlab/workspace";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useEffect, useState } from 'react';

const WorkspaceInfo: React.FC = () => {
  const { Title, Text, Paragraph } = Typography;
  const { workspaceId } = useParams()
  const [workspace, setWorkspace] = useState<WorkspaceInfoClass>(new WorkspaceInfoClass())
  const intl = useIntl();

  useEffect(() => {
    getWorkspace(workspaceId as string)
       .then((res) => {
          if (!res.message){
            const dto: WorkspaceInfoDTO = {
              id: res.id,
              name: res.name,
              createdAt: res.createdAt,
              lastAccessed: res.lastAccessed,
              updatedAt: res.updatedAt,
              description: res.description,
              template_id: res.template_id,
              state: res.state,
              type: res.type,
              parameters: res.parameters,
              tags: res.tags
            }
            const w = WorkspaceInfoClass.fromDTO(dto)
            setWorkspace(workspace => ({
              ...workspace,
              ...w}))
          } else {
            const Errormessage = intl.formatMessage({
              id: 'pages.workspaceInfo.failure',
              defaultMessage: res.message,
            });
            message.error(Errormessage);
          }
       })
       .catch((error) => {
          console.log(error)
       });
    }, []);

  const toolsets: ToolsetItemType[] = [
    {
      type: ToolsetType.Jupyter,
      // link: 'https://workspace-1.dev.quantumlab.cloud/?folder=/home/ccc/workspace-test',
    },
    {
      type: ToolsetType.VSCode,
    },
    {
      type: ToolsetType.Terminal,
    },
  ];
  
  const projectNameClass = useEmotionCss(() => {
    return {
      fontFamily: 'Ubuntu',
      fontStyle: 'normal',
      fontWeight: '500!important',
      fontSize: '34px!important',
      lineHeight: '130%',
      color: '#414141',
    };
  });

  const projectAttrClass = useEmotionCss(() => {
    return {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: '400!important',
      fontSize: '16px!important',
      lineHeight: '132%',
      color: '#818181',
    };
  });

  const subTitleClass = useEmotionCss(() => {
    return {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: '600!important',
      fontSize: '24px!important',
      lineHeight: '130%',
      color: '#414141',
      display: 'flex',
      alignItems: 'center',
    };
  });

  const descriptionClass = useEmotionCss(() => {
    return {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: '400!important',
      fontSize: '16px!important',
      lineHeight: '150%',
      color: '#818181',
      display: 'flex',
      alignItems: 'center',
      letterSpacing: '0.269px'
    };
  });

  const paramItemClass = useEmotionCss(() => {
    return {
      display: 'inline-block',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '5px 8px',
      minWidth: '160px',
      height: '83px',
      borderRadius: '8px',
      backgroundColor: 'white',
      // /* Inside auto layout */

      flex: '1',
      order: '0',
      alignSelf: 'stretch',
      flexGrow: '0'
    };
  });

  const paramValueClass = useEmotionCss(() => {
    return {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: '600!important',
      fontSize: '16px!important',
      lineHeight: '130%',
      color: '#414141',
      display: 'flex',
      alignItems: 'center',
    };
  });

  const paramKeyClass = useEmotionCss(() => {
    return {
      fontFamily: 'Manrope',
      fontStyle: 'normal',
      fontWeight: '400!important',
      fontSize: '12px!important',
      lineHeight: '150%',
      color: '#616161',
      display: 'flex',
      alignItems: 'center',
    };
  });

  const renderParam = (key: string, value: string) => {
    return (
      <div className={paramItemClass}>
        <Row>
          <Col>
            <Title className={paramValueClass}>{value}</Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text className={paramKeyClass}>{key}</Text>
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
              <Title className={projectNameClass}>{workspace?.name}</Title>
            </Col>
          </Row>
          <Row>
            <Space size='large'>
              <>
                <Title className={projectAttrClass}>{"Status: "}</Title>
                <ProjectStatus status={workspace?.state} margin={true}/>
              </>
              <Title className={projectAttrClass}>{"Owner: Lois"}</Title>
              <Title className={projectAttrClass}>{"Template: Melbourne Research Cloud QC Template 1"}</Title>
            </Space>
          </Row>
        </div>
      </Space>

      <Divider />

      <div>
        <Title className={subTitleClass}>
          Description
        </Title>
        <Paragraph className={descriptionClass}>
          {workspace.description}
        </Paragraph>
      </div>

      <Divider />

      <div>
        <Title className={subTitleClass}>
          Overview
        </Title>
        <Paragraph className={descriptionClass}>
          Inspect default and custome metadata for this workspace
        </Paragraph>
        <Space size="middle">
          {Object.entries(workspace?.parameters || {}).map(([key, value]) =>
            renderParam(key, value)
          )}
        </Space>
      </div>

      <Divider />

      <div>
        <Title className={subTitleClass}>
          Toolset
        </Title>
        <Paragraph className={descriptionClass}>
          Utilize the predefined toolset for your development
        </Paragraph>
        <div>
          {Object.entries(toolsets).map(([key, toolset]) =>
            renderToolset(toolset)
          )}
        </div>
      </div>
    </>
  )
}

export default WorkspaceInfo