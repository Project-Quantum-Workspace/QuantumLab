import { WorkspaceInfoClass} from "@/utils/types/WorkspaceTypes";
import { ToolsetClass } from "@/utils/types/ToolsetTypes";
import Toolset from "./components/ToolsetComponent";
import { PageLoading } from '@ant-design/pro-components';
import {
  Button,
  Col,
  Divider,
  Empty,
  Image,
  message,
  Row,
  Result,
  Space,
  Typography,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useIntl, useParams } from '@umijs/max';
import ProjectStatus from "../components/ProjectStatus";
import WorkspaceApi from "@/services/quantumlab/workspace";
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useEffect, useState } from 'react';

import { FrownOutlined } from '@ant-design/icons';


const WorkspaceInfo: React.FC = () => {
  const { Title, Text, Paragraph } = Typography;
  const { workspaceId } = useParams()
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState<WorkspaceInfoClass|undefined>(undefined)
  const [toolset, setToolset] = useState<ToolsetClass[]|undefined>([])
  const intl = useIntl();
  useEffect(() => {
    WorkspaceApi.getWorkspace(workspaceId as string)
      .then((res) => {
        if (!res.message)
          setWorkspace(res)
        else {
          const Errormessage = intl.formatMessage({
            id: 'pages.workspaceInfo.failure',
            defaultMessage: res.message,
          });
          message.error(Errormessage);
        }
        setLoading(false)
      })
      .catch((error) => {
          console.log(error)
      });
    }, []);

    useEffect(() => {
      WorkspaceApi.getWorksapceToolset(workspaceId as string)
        .then((res) => {
          if (res)
            setToolset(res)
        })
    }, [])

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
      <div className={paramItemClass} key={key}>
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

  const renderToolset = (key: string, toolset: ToolsetClass) => {
    return <Toolset key={key} tool={toolset} />;
  };

  const handleBack = () => {
    history.push('/workspace');
  };

  if(loading){
    return <PageLoading/>
  }
  return (
    <>
    {workspace ? (
      <>
        <div>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            style={{
              color: '#0F56B3',
              padding: 0
          }}>
            Back to My Project
        </Button>
      </div>

      <Space>
        <Image
          width={96}
          height={96}
          src={workspace.templateIcon}
        />
        <div>
          <Row>
            <Col>
              <Title className={projectNameClass} data-test-id="workspace-name">{workspace?.name}</Title>
            </Col>
          </Row>
          <Row>
            <Space size='large'>
              <>
                <Title className={projectAttrClass}>{"Status:"}</Title>
                <ProjectStatus status={workspace?.state} margin={true}/>
              </>
              <Title className={projectAttrClass}>{"Owner: Lois"}</Title>
              <Title className={projectAttrClass}>{"Template: " + workspace?.templateName}</Title>
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
          {toolset?.length ? toolset?.map((tool) => renderToolset(tool.accessId, tool)) : 
            <Empty 
              description={
                <span>
                  No toolset set up for this workspace yet.
                </span>
              }
            />
          }
        </div>
      </div>
    </>) : (
      <>
        <Result
          icon={<FrownOutlined />}
          title="Workspace Not Found"
        />
      </>
    )}

    </>
  )
}

export default WorkspaceInfo
