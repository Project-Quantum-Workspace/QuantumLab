import React from 'react';
import { Layout, PageHeader, Descriptions, Button, Timeline, Card } from 'antd';
import { CircuitOutlined, CodeOutlined, PlayCircleOutlined, DownloadOutlined } from '@ant-design/icons';

const { Content } = Layout;

const JobDetails: React.FC = () => {
  return (
    <Layout style={{ padding: '24px' }}>
      <PageHeader title="Jobs/ ID0020" backIcon={false} />

      <Content>
        <Card style={{ marginBottom: '24px' }}>
          <Descriptions title="Details" bordered column={1}>
            <Descriptions.Item label="Compute resource">ibm_brisbane</Descriptions.Item>
            <Descriptions.Item label="Sent from">Untitled circuit</Descriptions.Item>
            <Descriptions.Item label="Status">Queued</Descriptions.Item>
            <Descriptions.Item label="Instance">ibm-q/open/main</Descriptions.Item>
            <Descriptions.Item label="Program">sampler</Descriptions.Item>
            <Descriptions.Item label="# of circuits">1</Descriptions.Item>
          </Descriptions>
        </Card>

        <Card style={{ marginBottom: '24px' }}>
          <h4>Status Timeline</h4>
          <Timeline>
            <Timeline.Item dot={<PlayCircleOutlined style={{ fontSize: '16px' }} />}>Created: Oct 07, 2023 2:35 PM</Timeline.Item>
            <Timeline.Item>In queue</Timeline.Item>
            <Timeline.Item>Running</Timeline.Item>
            <Timeline.Item>Estimated usage: 33.1s</Timeline.Item>
            <Timeline.Item>Completed</Timeline.Item>
          </Timeline>
        </Card>

        <Card>
          <h4>Circuit</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button icon={<CircuitOutlined />} type="default">Diagram</Button>
            <Button icon={<CodeOutlined />} type="default">Qasm</Button>
            <Button icon={<DownloadOutlined />} type="default">Qiskit</Button>
          </div>
          {/* For the circuit diagram, you can place an SVG or any other visual representation here. */}
          <div style={{ marginTop: '24px' }}>
            Circuit visual representation goes here.
          </div>
        </Card>
      </Content>
    </Layout>
  );
};

export default JobDetails;
