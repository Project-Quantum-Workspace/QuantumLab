import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import { Space, Table, Tag } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import ProjectStatus from './ProjectStatus';
import AwsIcon from '../../../assets/aws.svg'
import { getAllWorkspace } from '@/services/quantumlab/workspace';
import { WorkspaceInfoDTO } from '../utils/types/WorkspaceTypes';
import { Link } from '@umijs/max';
import moment from 'moment';
import { PageLoading } from '@ant-design/pro-components';


interface Props {
  data: string
}
const columns: ColumnsType<WorkspaceInfoDTO> = [
  {
    title: '',
    key: 'templateId',
    dataIndex: 'templateId',
    render: (id) => {
      return (<>
        {id === 1 ?
          <img src={AwsIcon}></img>
          : <img src='/favicon.ico'></img>
        }
      </>)
    }
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a style={{ fontSize: '15px', fontWeight: 'bold', color: 'black' }}>{text}</a>
  },
  {
    title: 'Date Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render:(t)=><a style={{ fontSize: '15px',  color: 'black' }}>{moment(t).format("MMM Do YYYY")}</a>
  },
  {
    title: 'Last Accessed',
    dataIndex: 'lastAccessed',
    key: 'lastAccessed',
    render:(t)=><a style={{ fontSize: '15px',  color: 'black' }}>{moment(t, "YYYYMMDD").fromNow()}</a>
  },

  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    render: (text) => {

      return <>
        <ProjectStatus status={text} margin={false} />
      </>
    }

  },

  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
    render: (tagStr) => {
      const tags = tagStr.split(",");
      return (<>
        {tags.map((tag: string) => {
          let color = 'green';
          if (tag === 'CPU') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        }
        )}
      </>)
    }
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

]
const ProjectsTable = (props: Props) => {
  const data = props.data;
  const [workspaces, setworkspces] = useState(ws);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  useEffect(() => {
    getAllWorkspace(data)
      .then((res) => {
        setworkspces(res);
        setLoading(false);

      })
      .catch((error) => {
        console.log(error
          )
        setError(error.message)
      })
  }, [])
  if(error)return <><h1>{error
  }</h1></>
  if(loading){
    return <PageLoading/>
  }
  return <Table columns={columns} dataSource={workspaces}
    rowKey={workspaces => String(workspaces.id)} />;

}
const ws: WorkspaceInfoDTO[] = [
  {
    id: 1,
    // icon: string;
    name: 'AWS Example Project',
    createdAt: "2023-08-10T15:04:05Z",
    lastAccessed: "2023-08-10T15:04:05Z",
    updatedAt: "2023-08-10T15:04:05Z",
    description: "",
    template_id: 1,
    state: 'Stopped',
    tags: 'CPU, Qiskit',

  },
  {
    id: 2,
    // icon: string;
    name: 'AWS Example Project',
    createdAt: "2023-08-10T15:04:05Z",
    lastAccessed: "2023-08-10T15:04:05Z",
    updatedAt: "2023-08-10T15:04:05Z",
    description: "",
    template_id: 1,
    state: 'Stopped',
    tags: 'CPU, Qiskit',

  }
]

export default ProjectsTable