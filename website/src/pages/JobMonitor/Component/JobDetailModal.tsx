// JobDetailModal.tsx

import React from 'react';
import { Modal, Button } from 'antd';

interface JobDetailModalProps {
  status: string;
  createdBy: string;
  createdDate: string;
  completedDate: string;
  deviceConfig: string;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({
  status,
  createdBy,
  createdDate,
  completedDate,
  deviceConfig,
}) => {
  return (
      <div style={{ fontSize: '16px', lineHeight: '2', fontWeight: 'bold' }}>
        <p>Status: {status}</p>
        <p>Created by: {createdBy}</p>
        <p>Created date: {createdDate}</p>
        <p>Completed date: {completedDate}</p>
        <p>Device Configuration: {deviceConfig}</p>
      </div>
  );
};

export default JobDetailModal;
