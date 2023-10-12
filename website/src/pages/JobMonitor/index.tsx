import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import {
  DeleteOutlined,
  ExportOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

const JobMonitor: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [popupContent, setPopupContent] = useState<'info' | 'delete' | 'export' | null>(null);

  const handleOpenInfo = (jobId: string) => {
    setSelectedJob(jobId);
    setPopupContent('info');
    setVisible(true);
  };

  const handleOpenDelete = (jobId: string) => {
    setSelectedJob(jobId);
    setPopupContent('delete');
    setVisible(true);
  };

  const handleOpenExport = (jobId: string) => {
    setSelectedJob(jobId);
    setPopupContent('export');
    setVisible(true);
  };


  const handleCloseResult = () => {
    setSelectedJob(null);
    setVisible(false);
  };

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
          <Button type="link" icon={<InfoCircleOutlined />} onClick={() => handleOpenInfo(record.id)} />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleOpenDelete(record.id)} />
          <ExportOutlined onClick={() => handleOpenExport(record.id)} />
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
        title="Job Details"
        visible={visible}
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
        {popupContent === 'info' && selectedJob && <p>Details for the job: {selectedJob}</p>}
        {popupContent === 'delete' && selectedJob && <p>Confirm deletion for the job: {selectedJob}?</p>}
        {popupContent === 'export' && selectedJob && <p>Export details for the job: {selectedJob}</p>}
      </Modal>

    </div>
  );
};

export default JobMonitor;
