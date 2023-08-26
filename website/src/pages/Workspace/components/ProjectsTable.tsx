import React, { useEffect, useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import { Space, Table, Tag} from 'antd';
import {  DoubleRightOutlined } from '@ant-design/icons';
import ProjectStatus from './ProjectStatus';
import { ProjectItemType } from '../utils/types/projectItemTypes';
import AwsIcon from '../../../assets/aws.svg'
import { getAllWorkspace } from '@/services/quantumlab/workspace';
import { WorkspaceInfoDTO } from '../utils/types/WorkspaceTypes';

  
  interface Workspaces{
    data: string
  }
  const columns: ColumnsType<WorkspaceInfoDTO> =[
    {
      title:'',
      key:'template_id',
      dataIndex:'templateId',
      render:(id)=>{
        return (<>
        {id===1?
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
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      render:(text)=>{
       
        return <>
        <ProjectStatus status={text} margin={false}/>
        </>
      }
      
    },
    
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tagStr)=>{
        const tags= tagStr.split(",");
        return (<>
        {tags.map((tag:string)=>{
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
        </>)
      }
    },
    {
      title: ' ',
      key: 'action',
      dataIndex: 'id',
      render: (id) => (
        <Space size="middle">
          <a href={'/workspace/'+`${id}`}><DoubleRightOutlined /></a>
        </Space>
      ),
    },
   
  ]
const ProjectsTable=(props:Workspaces)=>{
  const data = props.data;
  const [workspaces, setworkspces] = useState(ws);
  useEffect(() => {
    getAllWorkspace(data)
    .then((res)=>{
    setworkspces(res);
      
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [])
  return <Table columns={columns} dataSource={workspaces}
   rowKey={workspaces=>String(workspaces.id)}/>;

}
const ws:WorkspaceInfoDTO[]=[
  {
    id: 1,
  // icon: string;
  name: 'AWS Example Project',
  createdAt:  "2023-08-10T15:04:05Z",
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
  createdAt:  "2023-08-10T15:04:05Z",
  lastAccessed: "2023-08-10T15:04:05Z",
  updatedAt: "2023-08-10T15:04:05Z",
  description: "",
  template_id: 1,
  state: 'Stopped',
  tags: 'CPU, Qiskit',

  }
]
// const d:WorkspaceInfoDTO[] =[
//   {
//     key:1,
//     icon:'',
//     name:'AWS Example Project',
//     createdAt: 'March 21,2023',
//     lastAccessed:'3 days ago',
//     template:'AWS Machine Learning Template 1',
//     status:'Stopped',
//     tags:['CPU'],
//   },
//   {
//     key:2,
//     icon:'',
//     name:'AWS Example Project',
//     createdAt: 'March 21,2023',
//     lastAccessed:'1 hours ago',
//     template:'AWS Machine Learning Template 1',
//     status:'Pending',
//     tags:['CPU']
//   },
//   {
//     key:3,
//     icon:'',
//     name:'AWS Example Project',
//     createdAt: 'March 21,2023',
//     lastAccessed:'2 weeks ago',
//     template:' Machine Learning Template 1',
//     status:'Running',
//     tags:['CPU']
//   },
//   {
//     key:4,
//     icon:'',
//     name:'AWS Example Project',
//     createdAt: 'March 21,2023',
//     lastAccessed:'1 years ago',
//     template:'AWS Machine Learning Template 1',
//     status:'Connecting',
//     tags:['Qiskit','CPU']
//   },
//   {
//     key:5,
//     icon:'',
//     name:'AWS Example Project',
//     createdAt: 'March 21,2023',
//     lastAccessed:'2 days ago',
//     template:' Machine Learning Template 1',
//     status:'Failed',
//     tags:['Qiskit','CPU']
//   }
// ]
export default ProjectsTable