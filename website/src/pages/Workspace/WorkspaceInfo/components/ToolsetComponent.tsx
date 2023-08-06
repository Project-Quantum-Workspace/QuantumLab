import {
  Col, Row, Typography
} from 'antd';
import { ToolsetType } from '../../utils/types/projectItemTypes';
import TerminalLOGO from '../../../../assets/TerminalLOGO.svg';
import VSCodeLOGO from '../../../../assets/VSCodeLOGO.svg';
import JupyterLOGO from '../../../../assets/JupyterLOGO.svg';
import './ToolsetComponent.css';

interface ToolsetProps {
  type: ToolsetType;
  link?: string;
}

const Toolset = (props: ToolsetProps) => {
  const { type, link } = props;
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
  return (
    <div 
    className='toolset-item'
    style={{
      width: '160px',
      height: '160px',
      textAlign: 'center',
      background: '#F7F7F7',
    }} 
    onClick={handleOpenLink}>
        <Row>
          <Col style={{ height: '80px' }} span={24}>
            <img className="toolset-img" src={logo} />
          </Col>
        </Row>
        <Row>
          <Col style={{ height: '24px' }} span={24}>
            <Title level={5} className="toolset-label">{label}</Title>
          </Col>
          </Row>
    </div>
  );
};
export default Toolset;
