import React from 'react';
import styled from 'styled-components';
import {
  CheckCircleFilled,
  LoadingOutlined,
  ClockCircleOutlined,
  CloseCircleFilled,
  ExclamationCircleFilled
} from '@ant-design/icons';

export enum JobStatusType {
  Completed = 'Completed',
  Queued = 'Queued',
  Running = 'Running',
  Failed = 'Failed',
  Cancelled = 'Cancelled'
}

interface JobStatusProps {
  status: JobStatusType;
}

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.08px;
`;

const StyledIcon = styled.span`
  margin-right: 6px;
`;

const JobStatus: React.FC<JobStatusProps> = ({ status }) => {
  let icon;
  let color;

  switch (status) {
    case JobStatusType.Completed:
      icon = <CheckCircleFilled />;
      color = '#2AB930';
      break;
    case JobStatusType.Queued:
      icon = <ClockCircleOutlined />;
      color = '#1672EC';
      break;
    case JobStatusType.Running:
      icon = <LoadingOutlined />;
      color = '#ED9526';
      break;
    case JobStatusType.Failed:
      icon = <ExclamationCircleFilled />;
      color = '#B9332A';
      break;
    case JobStatusType.Cancelled:
      icon = <CloseCircleFilled />;
      color = '#818181';
      break;
    default:
      break;
  }

  return (
    <StatusContainer style={{ color: color }}>
      <StyledIcon>{icon}</StyledIcon>
      {status}
    </StatusContainer>
  );
};

export default JobStatus;
