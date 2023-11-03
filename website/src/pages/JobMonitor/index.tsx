import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, notification } from 'antd';
import { DeleteOutlined, ExportOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import JobStatus, { JobStatusType } from './Component/JobStatus';
import JobDetailModal from '@/pages/JobMonitor/Component/JobDetailModal';

type Job = {
  id: string;
  backend: string;
  hub: string;
  group: string;
  project: string;
  state: {
    status: string;
  };
  program: {
    id: string;
  };
  created: string;
  cost: number;
  estimated_running_time_seconds: number;
  estimated_max_running_time_seconds: number;
  usage: {
    quantum_seconds: number;
    seconds: number;
  };
  tags?: string[]; // Made this optional since not every job has tags
  // Add other necessary fields if needed in the future
};

type JobApiResponse = {
  jobs: Job[];
  count: number;
  limit: number;
  offset: number;
};
type TableRowData = {
  key: string;
  job: Job;
};

const JobMonitor: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [popupContent, setPopupContent] = useState<'info' | 'cancel' | 'open' | null>(null);
  const [selectedJobStatus, setSelectedJobStatus] = useState<string | null>(null);
  const [data, setData] = useState<TableRowData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleHttpError = (errorCode: number, errorMessage: string) => {
    let description = errorMessage;

    // You can customize further based on specific error codes if needed.
    switch (errorCode) {
      case 400:
        notification.error({
          message: 'Bad Request',
          description,
        });
        break;
      case 401:
        notification.error({
          message: 'Unauthorized',
          description,
        });
        break;
      case 403:
        notification.error({
          message: 'Forbidden',
          description,
        });
        break;
      case 404:
        notification.error({
          message: 'Not Found',
          description,
        });
        break;
      case 408:
        notification.error({
          message: 'Request Timeout',
          description,
        });
        break;
      case 409:
        notification.error({
          message: 'Conflict',
          description,
        });
        break;
      case 500:
        notification.error({
          message: 'Internal Server Error',
          description,
        });
        break;
      default:
        notification.error({
          message: `Error Code: ${errorCode}`,
          description,
        });
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/job/list');

      if (!response.ok) {
        const errorResponse = await response.json();

        let errorMessage = '';
        if (errorResponse.errors && errorResponse.errors.length > 0) {
          errorMessage = `${errorResponse.errors[0].message}\n${errorResponse.errors[0].solution}`;
        } else {
          errorMessage = 'An unknown error occurred.';
        }

        handleHttpError(response.status, errorMessage);
        return;
      }

      const result: JobApiResponse = await response.json();

      const transformedData = result.jobs.map((job, index) => ({
        key: (index + 1).toString(),
        job,
      }));

      setData(transformedData);
    } catch (error) {
      const errMessage = (error as Error).message || String(error);
      notification.error({
        message: 'Error',
        description: `Failed to fetch data from API: ${errMessage}`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const redirectToJobDetailPage = (jobId: string) => {
    history.push(`jobMonitor/jobDetail/${jobId}`); // This assumes the route for job details page is `/job-detail/:jobId`
  };

  const handleOpenInfo = (job: Job) => {
    setSelectedJob(job);
    setPopupContent('info');
    setVisible(true);
  };

  const handleOpenDelete = (job: Job) => {
    setSelectedJob(job);
    setPopupContent('cancel');
    setVisible(true);
  };

  const handleOpenExport = (job: Job) => {
    setSelectedJob(job);
    setPopupContent('open');
    setVisible(true);
  };

  const handleCloseResult = () => {
    setSelectedJob(null);
    setVisible(false);
  };
  const handleOpenDetails = () => {
    if (selectedJob) {
      redirectToJobDetailPage(selectedJob.id);
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
      dataIndex: ['job', 'id'],
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: ['job', 'program', 'id'],
      key: 'name',
    },
    {
      title: 'Backend',
      dataIndex: ['job', 'backend'],
      key: 'backend',
    },
    {
      title: 'Status',
      dataIndex: ['job', 'state', 'status'],
      key: 'status',
      render: (status: JobStatusType) => <JobStatus status={status} />,
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text: any, record: TableRowData) => (
        <>
          <InfoCircleOutlined onClick={() => handleOpenInfo(record.job)} />
          <DeleteOutlined onClick={() => handleOpenDelete(record.job)} />
          <ExportOutlined onClick={() => handleOpenExport(record.job)} />
        </>
      ),
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
      <Table columns={columns} dataSource={data} loading={loading} />

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
            id={selectedJob.id}
            status={selectedJob.state.status}
            createdDate={new Date(selectedJob.created).toLocaleDateString()}
            backend={selectedJob.backend}
            hub={selectedJob.hub}
            group={selectedJob.group}
            project={selectedJob.project}
            programId={selectedJob.program.id}
            cost={selectedJob.cost}
            estimatedRunningTime={selectedJob.estimated_running_time_seconds}
            estimatedMaxRunningTime={selectedJob.estimated_max_running_time_seconds}
            quantumSeconds={selectedJob.usage.quantum_seconds}
            seconds={selectedJob.usage.seconds}
            tags={selectedJob.tags}
          />
        )}

        {popupContent === 'cancel' && selectedJob && (
          <p>Confirm deletion for the job: {selectedJob.id}?</p>
        )}
        {popupContent === 'open' && selectedJob && (
          <p>Open this job in Analyser: {selectedJob.id}</p>
        )}
      </Modal>
    </div>
  );
};

export default JobMonitor;
