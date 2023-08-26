import React from 'react'
import type { ColumnsType } from 'antd/es/table';
import { Space, Table, Tag} from 'antd';
import {  DoubleRightOutlined } from '@ant-design/icons';
import ProjectStatus from './ProjectStatus';
import { ProjectItemType } from '../utils/types/projectItemTypes';
import AwsIcon from '../../../assets/aws.svg'

  
  interface Workspaces{
    data:ProjectItemType[]
  }
  const columns: ColumnsType<ProjectItemType> =[
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
      dataIndex: 'createdAt',
      key: 'createdAt'
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
        <ProjectStatus status={text} margin={false}/>
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
const ProjectsTable=(props:Workspaces)=>{
  const data = props.data;
  return <Table columns={columns} dataSource={d} />;

}
const d:ProjectItemType[] =[
  {
    key:1,
    icon:'',
    name:'AWS Example Project',
    createdAt: 'March 21,2023',
    lastAccessed:'3 days ago',
    template:'AWS Machine Learning Template 1',
    status:'Stopped',
    tags:['CPU'],
  },
  {
    key:2,
    icon:'',
    name:'AWS Example Project',
    createdAt: 'March 21,2023',
    lastAccessed:'1 hours ago',
    template:'AWS Machine Learning Template 1',
    status:'Pending',
    tags:['CPU']
  },
  {
    key:3,
    icon:'',
    name:'AWS Example Project',
    createdAt: 'March 21,2023',
    lastAccessed:'2 weeks ago',
    template:' Machine Learning Template 1',
    status:'Running',
    tags:['CPU']
  },
  {
    key:4,
    icon:'',
    name:'AWS Example Project',
    createdAt: 'March 21,2023',
    lastAccessed:'1 years ago',
    template:'AWS Machine Learning Template 1',
    status:'Connecting',
    tags:['Qiskit','CPU']
  },
  {
    key:5,
    icon:'',
    name:'AWS Example Project',
    createdAt: 'March 21,2023',
    lastAccessed:'2 days ago',
    template:' Machine Learning Template 1',
    status:'Failed',
    tags:['Qiskit','CPU']
  }
]
export default ProjectsTable