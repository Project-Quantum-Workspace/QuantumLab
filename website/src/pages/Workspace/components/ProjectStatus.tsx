import React from 'react';
import RunningIcon from '../../../assets/running.svg';
import StoppedIcon from '../../../assets/stopped.svg';
import PendingIcon from '../../../assets/pending.svg';
import FailedIcon from '../../../assets/failed.svg';
import ConnectingIcon from '../../../assets/connecting.svg';
import { StatusType } from '../utils/types/projectItemTypes';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import {
  Space,
  Typography
} from 'antd';

interface StatusProps {
  status: StatusType;
}

const ProjectStatus = (props: StatusProps) => {
  const status = props.status;
  let iconType = '';
  let labelColor = '';
  const { Title } = Typography;

  switch (status) {
    case StatusType.Running:
      iconType = RunningIcon;
      labelColor = '#2AB930';
      break;
    case StatusType.Stopped:
      iconType = StoppedIcon;
      labelColor = '#818181';
      break;
    case StatusType.Pending:
      iconType = PendingIcon;
      labelColor = '#ED9526';
      break;
    case StatusType.Failed:
      iconType = FailedIcon;
      labelColor = '#B9332A';
      break;
    case StatusType.Connecting:
      iconType = ConnectingIcon;
      labelColor = '#1672EC';
      break;
  }
  const statusIconClass = useEmotionCss(() => {
    return {
      width: '14px',
      height: '14px'
    };
  });
  const statusLabelClass = useEmotionCss(() => {
    return {
      fontFamily: 'Manrope',
      fontSize: '16px!important',
      fontStyle: 'normal',
      fontWeight: '800!important',
      lineHeight: '24px!important', /* 150% */
      letterSpacing: '0.08px',
    };
  });
  return (
    <Space align="baseline">
      <img className={statusIconClass} src={iconType} />
      <Title className={statusLabelClass} style={{ color: labelColor }}>{status}</Title>
    </Space>
  );
};

export default ProjectStatus;
