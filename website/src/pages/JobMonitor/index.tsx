import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { DeleteOutlined, ExportOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';

const JobMonitor: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [popupContent, setPopupContent] = useState<'info' | 'cancel' | 'open' | null>(null);
  const [selectedJobStatus, setSelectedJobStatus] = useState<string | null>(null);

  const handleOpenInfo = (jobId: string) => {
    setSelectedJob(jobId);
    setPopupContent('info');
    setVisible(true);
  };

  const handleOpenDelete = (jobId: string) => {
    setSelectedJob(jobId);
    setPopupContent('cancel');
    setVisible(true);
  };

  const handleOpenExport = (jobId: string) => {
    setSelectedJob(jobId);
    setPopupContent('open');
    setVisible(true);
  };

  const handleCloseResult = () => {
    setSelectedJob(null);

    setVisible(false);
  };

  const handleOpenDetails = () => {
    handleCloseResult(); // Close the modal first
    // history.push('/analyseTool'); // Redirect to /analyseTool
  };

  function handleConfirm() {
    console.log('The job is cancelled!');
  }

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
          <InfoCircleOutlined onClick={() => handleOpenInfo(record.id)} />
          <DeleteOutlined onClick={() => handleOpenDelete(record.id)} />
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
  ];

  const handleConfirmCancel = () => {
    // logic to handle the confirmation of cancel
    handleCloseResult();
  };

  const handleConfirmOpen = () => {
    // logic to handle the confirmation of open
    handleCloseResult();
  };

  const renderFooter = () => {
    switch (popupContent) {
      case 'info':
        if (selectedJobStatus === 'Queued') {
          return [
            <Button key="back" onClick={handleCloseResult}>
              Back
            </Button>,
            <Button key="details" onClick={handleOpenDetails}>
              Details
            </Button>,
          ];
        }
        return [
          <Button key="back" onClick={handleCloseResult}>
            Back
          </Button>,
        ];

      case 'cancel':
        return [
          <Button key="back" onClick={handleCloseResult}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={handleConfirmCancel}>
            Confirm
          </Button>,
        ];

      case 'open':
        return [
          <Button key="back" onClick={handleCloseResult}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={handleConfirmOpen}>
            Confirm
          </Button>,
        ];

      default:
        return null;
    }
  };


  return (
    <div>
      <Table columns={columns} dataSource={data} />

      <Modal
        title={
          popupContent === 'info'
            ? 'Job Details'
            : popupContent === 'cancel'
            ? 'Status Update'
            : popupContent === 'open'
            ? 'Open with Result Analyser'
            : 'Modal'
        }
        open={visible}
        onOk={handleCloseResult}
        onCancel={handleCloseResult}
        footer={renderFooter()}
      >
        {popupContent === 'info' && selectedJob && <p>Details for the job: {selectedJob}</p>}
        {popupContent === 'cancel' && selectedJob && (
          <p>Confirm deletion for the job: {selectedJob}?</p>
        )}
        {popupContent === 'open' && selectedJob && <p>Export details for the job: {selectedJob}</p>}
      </Modal>
    </div>
  );
};

export default JobMonitor;
