import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JobDetail.css';
interface Job {
  id: string | undefined;
  computeResource: string;
  from: string;
  status: string;
  instance: string;
  program: string;
  circuits: number;
  created: string;
  timeline: Array<{ status: string; time: string }>;
  // ... add other necessary properties
}

const JobDetail: React.FC = () => {
  const [job, setJob] = useState<Job | null>(null);

  const { jobId } = useParams<{ jobId: string }>();

  useEffect(() => {
    // Mock data for demonstration:
    setJob({
      id: jobId,
      computeResource: 'ibm_brisbane',
      from: 'Untitled circuit',
      status: 'Queued',
      instance: 'ibm-q/open/main',
      program: 'sampler',
      circuits: 1,
      created: 'Oct 07, 2023 2:35 PM',
      timeline: [
        { status: 'Created', time: 'Oct 07, 2023 2:35 PM' },
        { status: 'In queue', time: '...' },
        { status: 'Running', time: '...' },
        { status: 'Completed', time: '...' },
      ],
      // ... add other necessary properties
    });
  }, [jobId]);

  return (
    <div className="page-container">
      <div className="header">
        Jobs/ {job?.id}
        <div className="action-buttons">
          <button>Cancel</button>
          <button>Download</button>
          <button>Back</button>
        </div>
      </div>

      <div className="main-content">
        {/* Details Section */}
        {job && (
          <div className="details-section">
            <div className="details-item">
              <div className="key">Compute resource:</div>
              <div className="value">{job.computeResource}</div>
            </div>
            <div className="details-item">
              <div className="key">From:</div>
              <div className="value">{job.from}</div>
            </div>
            <div className="details-item">
              <div className="key">Status:</div>
              <div className="value">{job.status}</div>
            </div>
            {/* ... Add more details items here */}
          </div>
        )}

        {/* Status Timeline */}
        {job && (
          <div className="status-timeline">
            {job.timeline.map((item, index) => (
              <div
                key={index}
                className={`status-item ${item.status.toLowerCase().replace(/ /g, '-')}`}
              >
                {item.status}: {item.time}
              </div>
            ))}
          </div>
        )}

        {/* Circuit Section */}
        <div className="circuit-section">
          <div className="circuit-tabs">
            <button className="active">Diagram</button>
            <button>Qasm</button>
            <button>Qiskit</button>
          </div>
          <div className="circuit-diagram">{/* Display the quantum circuit diagram here */}</div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
