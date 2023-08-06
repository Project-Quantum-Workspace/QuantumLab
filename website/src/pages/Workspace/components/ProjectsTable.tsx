import PropTypes from 'prop-types'
import React, { Component } from 'react'
import type { ColumnsType } from 'antd/es/table';
import { Space, Table, Tag} from 'antd';
import { CaretRightOutlined, CloudFilled, DoubleRightOutlined, LoadingOutlined, PauseCircleFilled, WarningFilled } from '@ant-design/icons';
import { styled } from 'styled-components';
import ProjectStatus from './ProjectStatus';
import { StatusType } from '../utils/types/projectItemTypes';
import AwsIcon from '../../../assets/aws.svg'

interface WorkspaceData{
    key: number;
    name:string;
    dateCreated:string;
    lastAccessed:string;
    template:string;
    status:string;
    tags:string[];
    
  }
  const columns: ColumnsType<WorkspaceData> =[
    {
      title:'',
      key:'icon',
      dataIndex:'template',
      render:(text)=>{
        return (<>
        {text.substring(0,3)==='AWS'?
        <img src={AwsIcon}></img>
        :<img src='/favicon.ico'></img>
      }
        </>)
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text)=><a style={{fontSize:'15px',fontWeight:'bold',color:'black'}}>{text}</a>
    },
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated'
    },
    {
      title: 'Last Accessed',
      dataIndex: 'lastAccessed',
      key: 'lastAccessed'
    },
    {
      title: 'Template',
      dataIndex: 'template',
      key: 'template'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render:(text)=>(
        <>
        {text==='Running' &&<ProjectStatus status={StatusType.Running} margin={false}/>}
        {text==='Stopped' &&<ProjectStatus status={StatusType.Stopped} margin={false}/>}
        {text==='Pending' &&<ProjectStatus status={StatusType.Pending} margin={false}/>}
        {text==='Connecting' &&<ProjectStatus status={StatusType.Connecting} margin={false}/>}
        {text==='Failed' &&<ProjectStatus status={StatusType.Failed} margin={false}/>}
        </>
      )
        
        
      
    },
    
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (_,{tags})=>(
        <>
        {tags.map((tag)=>{
          let color = 'green';
          if(tag==='CPU'){
            color='volcano';
          }
          return(
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        }
        )}
        </>
      )
    },
    {
      title: ' ',
      key: 'action',
      dataIndex: 'key',
      render: (text) => (
        <Space size="middle">
          <a href={'/workspace/'+`${text}`}><DoubleRightOutlined /></a>
        </Space>
      ),
    },
   
  ]
const ProjectsTable: React.FC=()=>{
  return <Table columns={columns} dataSource={data} />;

}
const data: WorkspaceData[] =[
  {
    key:1,
    name:'AWS Example Project',
    dateCreated: 'March 21,2023',
    lastAccessed:'3 days ago',
    template:'AWS Machine Learning Template 1',
    status:'Stopped',
    tags:['CPU']
  },
  {
    key:2,
    name:'AWS Example Project',
    dateCreated: 'March 21,2023',
    lastAccessed:'1 hours ago',
    template:'AWS Machine Learning Template 1',
    status:'Pending',
    tags:['CPU']
  },
  {
    key:3,
    name:'AWS Example Project',
    dateCreated: 'March 21,2023',
    lastAccessed:'2 weeks ago',
    template:' Machine Learning Template 1',
    status:'Running',
    tags:['CPU']
  },
  {
    key:4,
    name:'AWS Example Project',
    dateCreated: 'March 21,2023',
    lastAccessed:'1 years ago',
    template:'AWS Machine Learning Template 1',
    status:'Connecting',
    tags:['Qiskit','CPU']
  },
  {
    key:5,
    name:'AWS Example Project',
    dateCreated: 'March 21,2023',
    lastAccessed:'2 days ago',
    template:' Machine Learning Template 1',
    status:'Failed',
    tags:['Qiskit','CPU']
  }
]
export default ProjectsTable