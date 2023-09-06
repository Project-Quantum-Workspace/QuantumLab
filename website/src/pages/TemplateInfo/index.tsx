import {
  Button,
  Divider, 
  Image,
  Row, 
  Result,
  Space,
  Typography,
} from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FrownOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import useTemplateStore from '@/stores/TemplateStore'

const TemplateInfo: React.FC = () => {
  const { Title, Text } = Typography;
  const { currentTemplate, setCurrentTemplate } = useTemplateStore()
  
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

  const createBtnClass = useEmotionCss(() => {
    return {
      float: 'right',
      borderRadius: '8px',
      background: '#0F56B3',
      color: '#C5DCFA',
      boxShadow: '0px 2px 4px 0px rgba(15, 86, 179, 0.20), 0px 1px 2px 0px rgba(15, 86, 179, 0.20)',
      fontFamily: 'Manrope!important',
      fontSize: '16px!important',
      fontStyle: 'normal',
      fontWeight: '700!important',
      lineHeight: '150%', /* 24px */
      letterSpacing: '0.8px',
      textTransform: 'capitalize'
    }
  })

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

  const readmeClass = useEmotionCss(() => {
    return {
      overflow: 'auto',
      height: '250px',
      padding: '10px 16px',
      borderRadius: '8px',
      border: '1.5px solid #C0C0C0',
      boxShadow: '0px 16px 32px 2px rgba(97, 97, 97, 0.10), 0px 8px 16px 2px rgba(97, 97, 97, 0.10)'
    };
  });

  const renderParam = (key: string, label: string, options?: string[]) => {
    return (
      <div className={paramItemClass} key={key}>
        <Row>
            <Title className={paramValueClass}>{label}</Title>
        </Row>
        { options ? ( Object.entries(options).map(([key, op]) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Row key={key}>
              <Text className={paramKeyClass}>{op}</Text>
            </Row>
          )
        })) : (
          <Row>
            <Text className={paramKeyClass}>Input your own value</Text>
          </Row>
        ) }
        
      </div>
    );
  };

  
  const handleBack = () => {
    history.push('/workspace', { tag: 'template' });
    setCurrentTemplate(undefined)
  };

  const handleCreateWorkspace = (templateId: number) => {
    history.push('/workspace/new', { templateId: templateId });
  }

  return (
    <>{currentTemplate ? (
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
          Back to Templates
        </Button>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <Image
          width={96}
          height={96}
          src={currentTemplate.icon}
        />
        <div style={{ width: '100%' }}>
          <Title className={projectNameClass}>{currentTemplate?.filename}</Title>
          <Button 
            data-test-id='new-workspace-template'
            icon={<PlusOutlined />}
            onClick={() => handleCreateWorkspace(currentTemplate.id)}
            className={createBtnClass}>
            New Workspace Using This Template
          </Button>
        </div>      
      </div>

      <Divider />

      <div>
        <Title className={subTitleClass}>
          Overview
        </Title>
        <Space size="middle">
          {Object.entries(currentTemplate?.parameters || {}).map(([key, param]) =>
            renderParam(key, param.label, param.selections)
          )}
        </Space>
      </div>

      <Divider />

      <div>
        <Title className={subTitleClass}>
          README
        </Title>
        <div className={readmeClass}>
          <ReactMarkdown>{currentTemplate.readme}</ReactMarkdown>
        </div>
      </div>
    </>) : (
      <Result
        icon={<FrownOutlined />}
        title="Template Not Found"
      />
    )}</>
  )
}

export default TemplateInfo