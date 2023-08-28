import {
  Col, Row, Typography
} from 'antd';
import { ToolsetType } from '../../utils/types/WorkspaceTypes';
import TerminalLOGO from '../../../../assets/TerminalLOGO.svg';
import VSCodeLOGO from '../../../../assets/VSCodeLOGO.svg';
import JupyterLOGO from '../../../../assets/JupyterLOGO.svg';
import { useEmotionCss } from '@ant-design/use-emotion-css';

interface ToolsetProps {
  key: string;
  type: ToolsetType;
  link?: string;
}

const Toolset = (props: ToolsetProps) => {
  const { key, type, link } = props;
  const handleOpenLink = () => {
    window.open(
      // 'https://workspace-1.dev.quantumlab.cloud/?folder=/home/ccc/workspace-test',
      link,
      '_blank',
    );
  };
  let logo = '';
  let label = '';
  switch (type) {
    case ToolsetType.Terminal:
      logo = TerminalLOGO;
      label = 'Terminal';
      break;
    case ToolsetType.Jupyter:
      logo = JupyterLOGO;
      label = 'JupyterLab';
      break;
    case ToolsetType.VSCode:
      logo = VSCodeLOGO;
      label = 'VS Code Web';
      break;
  }
  const { Title } = Typography;

  const toolsetClass = useEmotionCss(() => {
    return {
      width: '160px',
      height: '160px',
      background: '#F7F7F7',
      borderRadius: '30px',
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
      key={key}
      className={toolsetClass}
      onClick={handleOpenLink}>
        <Row>
          <Col span={24}>
            <img className={toolsetImgClass} src={logo} />
          </Col>
        </Row>
        <Row>
          <Col style={{ height: '24px' }} span={24}>
            <Title level={5} className={toolsetLabelClass}>{label}</Title>
          </Col>
          </Row>
    </div>
  );
};
export default Toolset;
