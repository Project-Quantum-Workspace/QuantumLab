import React from 'react';

interface JobDetailModalProps {
  id: string;
  status: string;
  createdDate: string;
  backend: string;
  hub: string;
  group: string;
  project: string;
  programId: string;
  cost: number;
  estimatedRunningTime: number;
  estimatedMaxRunningTime: number;
  quantumSeconds: number;
  seconds: number;
  tags?: string[]; // This is optional since not all jobs have tags
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({
  id,
  status,
  createdDate,
  backend,
  hub,
  group,
  project,
  programId,
  cost,
  estimatedRunningTime,
  estimatedMaxRunningTime,
  quantumSeconds,
  seconds,
  tags,
}) => {
  return (
    <div style={{ fontSize: '16px', padding: '20px', background: '#f6f8fa', borderRadius: '10px' }}>
      <p>
        <strong>ID:</strong> {id}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p>
        <strong>Created Date:</strong> {createdDate}
      </p>
      <p>
        <strong>Backend:</strong> {backend}
      </p>
      <p>
        <strong>Hub:</strong> {hub}
      </p>
      <p>
        <strong>Group:</strong> {group}
      </p>
      <p>
        <strong>Project:</strong> {project}
      </p>
      <p>
        <strong>Program ID:</strong> {programId}
      </p>
      <p>
        <strong>Cost:</strong> {cost}
      </p>
      <p>
        <strong>Estimated Running Time (seconds):</strong> {estimatedRunningTime}
      </p>
      <p>
        <strong>Estimated Max Running Time (seconds):</strong> {estimatedMaxRunningTime}
      </p>
      <p>
        <strong>Quantum Seconds Used:</strong> {quantumSeconds}
      </p>
      <p>
        <strong>Seconds Used:</strong> {seconds}
      </p>
      {tags && (
        <div>
          <strong>Tags:</strong>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            {tags.map((tag, index) => (
              <li
                key={index}
                style={{
                  display: 'inline-block',
                  margin: '5px',
                  padding: '5px 10px',
                  background: '#007acc',
                  color: 'white',
                  borderRadius: '5px',
                  overflowWrap: 'break-word', // This will ensure long tags break into the next line
                  maxWidth: '90%', // This ensures each tag does not exceed its container width
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default JobDetailModal;
