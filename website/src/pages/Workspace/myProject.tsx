import PropTypes from 'prop-types'
import React, { Component } from 'react'
import type { ColumnsType } from 'antd/es/table';
import { Space, Table, Tag} from 'antd';
import { CaretRightOutlined, CloudFilled, DoubleRightOutlined, LoadingOutlined, PauseCircleFilled, WarningFilled } from '@ant-design/icons';
import { styled } from 'styled-components';

const StyledT = styled.p`
margin-left: 5px;
margin-bottom: 2px
`

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
      render:(text)=>{
        
        return (
          <div style={{display:'flex',flexDirection:'row',color:'#818181'}}>
        {text==='Running' &&<CaretRightOutlined style={{color:"#2AB930"}}/>}
        {text==='Stopped' &&
       
        <PauseCircleFilled style={{color:'#818181'}} /> 
        }
        {text==='Pending' &&<LoadingOutlined spin style={{color:'#ED9526'}}/>}
        {text==='Connecting' &&<CloudFilled style={{color:'#1672EC'}}/>}
        {text==='Failed' &&<WarningFilled style={{color:'#B9332A'}}/>}
        <StyledT>{text}</StyledT>
        </div>
        )
      }
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
      render: () => (
        <Space size="middle">
          <a><DoubleRightOutlined /></a>
        </Space>
      ),
    },
   
  ]
const MyProject: React.FC=()=>{
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
    template:'AWS Machine Learning Template 1',
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
    template:'AWS Machine Learning Template 1',
    status:'Failed',
    tags:['Qiskit','CPU']
  }
]
export default MyProject