import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Space, Table, Tag } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import ProjectStatus from './ProjectStatus';
import  WorksapceApi from '@/services/quantumlab/workspace';
import { WorkspaceInfoMetaData } from '@/utils/types/WorkspaceTypes';
import { Link } from '@umijs/max';
import { PageLoading } from '@ant-design/pro-components';
import { Image } from 'antd';

interface Props {
  data: number | undefined;
}

const periods = {
  year: 12 * 30 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
};
const durationCalculator = (t: string) => {
  let lastAcc: Date = new Date(t);
  let curtime: Date = new Date();

  let diff = curtime.valueOf() - lastAcc.valueOf();
  if (diff > periods.year) {
    const m = Math.floor(diff / periods.year);
    return m === 1 ? 'a year ago' : String(m) + ' years ago';
  } else if (diff > periods.month) {
    const m = Math.floor(diff / periods.month);
    return m === 1 ? 'a month ago' : String(m) + ' months ago';
  } else if (diff > periods.week) {
    const w = Math.floor(diff / periods.week);
    return w === 1 ? 'a week ago' : String(w) + ' weeks ago';
  } else if (diff > periods.day) {
    const d = Math.floor(diff / periods.day);
    return d === 1 ? 'a day ago' : String(d) + ' days ago';
  } else if (diff > periods.hour) {
    const h = Math.floor(diff / periods.hour);
    return h === 1 ? 'an hour ago' : String(h) + ' hours ago';
  } else if (diff > periods.minute) {
    const m = Math.floor(diff / periods.minute);
    return m === 1 ? 'a minute ago' : String(m) + ' minutes ago';
  }
  return 'Just now';
};

const columns: ColumnsType<WorkspaceInfoMetaData> = [
  {
    title: '',
    key: 'templateId',
    dataIndex: 'template',
    render: (template) => {
      return (
        <>
          <Image src={template.icon} />
        </>
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => (
      <a style={{ fontSize: '15px', fontWeight: 'bold', color: 'black' }}>{text}</a>
    ),
  },
  {
    title: 'Date Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (t) => (
      <a style={{ fontSize: '15px', color: 'black' }}>
        {new Date(t).toLocaleString().substring(0, 10)}
      </a>
    ),
  },
  {
    title: 'Last Accessed',
    dataIndex: 'lastAccessed',
    key: 'lastAccessed',
    render: (t) => {
      return <a style={{ fontSize: '15px', color: 'black' }}>{durationCalculator(t)}</a>;
    },
  },

  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    render: (text) => {
      return (
        <>
          <ProjectStatus status={text} margin={false} />
        </>
      );
    },
  },

  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tagStr) => {
      const tags = tagStr.split(',');
      return (
        <>
          {tags.map((tag: string) => {
            let color = 'green';
            if (tag === 'CPU') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      );
    },
  },
  {
    title: ' ',
    key: 'action',
    dataIndex: 'id',
    render: (id) => (
      <Space size="middle">
        <Link to={'/workspace/' + `${id}`}>
          <DoubleRightOutlined />
        </Link>
      </Space>
    ),
  },
];
const ProjectsTable = (props: Props) => {
  const data = props.data;
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    WorksapceApi.getAllWorkspace(String(data))
      .then((res) => {
        setWorkspaces(res);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }, []);
  if (error)
    return (
      <>
        <h1>{error}</h1>
      </>
    );
  if (loading) {
    return <PageLoading />;
  }
  return (
    <Table
      columns={columns}
      dataSource={workspaces}
      rowKey={(workspaces) => String(workspaces.id)}
    />
  );
};

export default ProjectsTable
