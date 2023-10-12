import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const JobMonitor: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleOpenResult = (jobId: string) => {
    setSelectedJob(jobId);
    setVisible(true);
  };

  const handleCloseResult = () => {
    setSelectedJob(null);
    setVisible(false);
  };
  const dataSource = [
    {
      key: '1',
      id: 'ID00110',
      name: 'JOB_title',
      backend: 'Backend_01',
      status: 'Completed',
    },
    {
      key: '2',
      id: 'ID0020',
      name: 'JOB_title',
      backend: 'Backend_02',
      status: 'Queued',
    },
    // ... Add other rows similarly
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Backend',
      dataIndex: 'backend',
      key: 'backend',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text: any, record: any) => (
        <>
          <Button type="link" icon={<InfoCircleOutlined />} />
          <Button type="link" icon={<DeleteOutlined />} />
          <ExportOutlined onClick={() => handleOpenResult(record.id)} />
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      id: 'ID00110',
      name: 'JOB_title',
      backend: 'Backend_01',
      status: 'Completed',
    },
    // ... Add other rows similarly
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="Open with Result Analyser"
        open={visible}
        onOk={handleCloseResult}
        onCancel={handleCloseResult}
        footer={[
          <Button key="back" onClick={handleCloseResult}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={handleCloseResult}>
            Confirm
          </Button>,
        ]}
      >
        {selectedJob && <p>You are trying to open the job: {selectedJob} in result Analyser</p>}
      </Modal>
    </div>
  );
};

export default JobMonitor;
