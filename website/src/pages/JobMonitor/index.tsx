import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { DeleteOutlined, ExportOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import JobStatus, { JobStatusType } from './Component/JobStatus';
import JobDetailModal from '@/pages/JobMonitor/Component/JobDetailModal';

const JobMonitor: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [popupContent, setPopupContent] = useState<'info' | 'cancel' | 'open' | null>(null);
  const [selectedJobStatus, setSelectedJobStatus] = useState<string | null>(null);
  const [jobDetailsVisible, setJobDetailsVisible] = useState(false);


  const redirectToJobDetailPage = (jobId: string) => {
    history.push(`jobMonitor/jobDetail/${jobId}`);  // This assumes the route for job details page is `/job-detail/:jobId`
  };


  const handleOpenInfo = (jobId: string, status: JobStatusType) => {
    setSelectedJob(jobId);
    setSelectedJobStatus(status);
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
    if (selectedJob) {
      redirectToJobDetailPage(selectedJob);
    }
  };

  const handleConfirmCancel = () => {
    // logic to handle the confirmation of cancel
    handleCloseResult();
  };

  const handleConfirmOpen = () => {
    // logic to handle the confirmation of open
    handleCloseResult();
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
      render: (status: JobStatusType) => <JobStatus status={status} />,
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text: any, record: any) => (
        <>
          <InfoCircleOutlined onClick={() => handleOpenInfo(record.id, record.status)} />
          <DeleteOutlined onClick={() => handleOpenDelete(record.id)} />
          <ExportOutlined onClick={() => handleOpenExport(record.id)} />
        </>
      ),
    }
  ];

  const data = [
    {
      key: '1',
      id: 'ID00110',
      name: 'JOB_title_1',
      backend: 'Backend_01',
      status: JobStatusType.Completed,
    },
    {
      key: '2',
      id: 'ID00111',
      name: 'JOB_title_2',
      backend: 'Backend_02',
      status: JobStatusType.Queued,
    },
    {
      key: '3',
      id: 'ID00112',
      name: 'JOB_title_3',
      backend: 'Backend_03',
      status: JobStatusType.Running,
    },
    {
      key: '4',
      id: 'ID00113',
      name: 'JOB_title_4',
      backend: 'Backend_04',
      status: JobStatusType.Failed,
    },
    {
      key: '5',
      id: 'ID00114',
      name: 'JOB_title_5',
      backend: 'Backend_05',
      status: JobStatusType.Cancelled,
    },
  ];

  const renderFooter = () => {
    switch (popupContent) {
      case 'info':
        if (selectedJobStatus === JobStatusType.Queued) {
          return [
            <Button key="back" onClick={handleCloseResult}>
              Back
            </Button>,
            <Button key="details" onClick={handleOpenDetails}>
              Details
            </Button>,
          ];
        }
        return null;

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
        {popupContent === 'info' && selectedJob && (
          <JobDetailModal
            status="Completed"
            createdBy="Andrew"
            createdDate="12/9/2021"
            completedDate="23/11/2022"
            deviceConfig="simulator 2"
          />
        )}

        {popupContent === 'cancel' && selectedJob && (
          <p>Confirm deletion for the job: {selectedJob}?</p>
        )}
        {popupContent === 'open' && selectedJob && <p>Export details for the job: {selectedJob}</p>}
      </Modal>
    </div>
  );
};

export default JobMonitor;
