import {
  Col, Row, Typography
} from 'antd';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { ToolsetClass } from '@/utils/types/ToolsetTypes';

interface ToolsetProp {
  key: string
  tool: ToolsetClass
}

const Toolset = (props: ToolsetProp) => {
  const { tool } = props
  const handleOpenLink = (accessId: string) => {
    const link = ToolsetClass.getLink(accessId)
    if (link)
      window.open(link, '_blank')
  }

  const { Title } = Typography;

  const toolsetClass = useEmotionCss(() => {
    return {
      padding: '0.5rem',
      marginLeft: '1.5rem',
      background: 'white',
      borderRadius: '20px',
      cursor: 'pointer',
      display: 'inline-block',
      textAlign: 'center'
    };
  });

  const toolsetImgClass = useEmotionCss(() => {
    return {
      width: '100px',
      height: '80px',
      background: 'transparent',
    };
  });

  const toolsetLabelClass = useEmotionCss(() => {
    return {
      fontFamily: 'Source Sans Pro',
      fontStyle: 'normal',
      fontWeight: '300!important',
      fontSize: '12px!important',
      lineHeight: '150%',
      letterSpacing: '0.0168em',
      color: '#616161'
    };
  });

  return (
    <div 
      className={toolsetClass}
      onClick={() => handleOpenLink(tool.accessId)}>
        <Row>
          <Col span={24}>
            <img 
              className={toolsetImgClass} 
              src={tool.icon} 
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ height: '24px' }} span={24}>
            <Title level={5} className={toolsetLabelClass}>{tool.name}</Title>
          </Col>
          </Row>
    </div>
  );
};
export default Toolset;
