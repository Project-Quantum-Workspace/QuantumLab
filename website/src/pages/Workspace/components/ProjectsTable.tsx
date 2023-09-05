import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import { Space, Table, Tag } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import ProjectStatus from './ProjectStatus';
import { getAllWorkspace } from '@/services/quantumlab/workspace';
import { WorkspaceInfoMetaData } from '../utils/types/WorkspaceTypes';
import { Link } from '@umijs/max';
import moment from 'moment';
import { PageLoading } from '@ant-design/pro-components';
import {Image} from 'antd'

interface Props {
  data: number | undefined
}
const columns: ColumnsType<WorkspaceInfoMetaData> = [
  {
    title: '',
    key: 'templateId',
    dataIndex: 'template',
    render: (template) => {
      return (<>
        <Image src={template.icon}/>
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
    render:(t)=>
    <a style={{ fontSize: '15px',  color: 'black' }}>{moment(moment(t).format("MMM Do YYYY"), "YYYYMMDD").fromNow()}</a>
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
  const [workspaces, setworkspces] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  useEffect(() => {
    getAllWorkspace(String(data))
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

export default ProjectsTable