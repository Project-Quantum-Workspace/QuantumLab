import { ColumnsType } from 'antd/es/table'
import React, { Component } from 'react'
import AwsIcon from '../../../assets/aws.svg'
import moment from 'moment'
import LabIcon from '../../../assets/Lab_logo.svg'
import {Space, Table} from 'antd'
import { Link } from '@umijs/max'
import { DoubleRightOutlined } from '@ant-design/icons'

type TemplateData={
    id: number,
    name: string,
    createdAt: string,
    accessLevel: number,
    
}
interface Props{
  data:number | undefined
}

const columns:ColumnsType<TemplateData>=[
  {
    title:'',
    key:'templateId',
    dataIndex:'id',
    render: (id) => {
      return (<>
        {id === 1 ?
          <img src={AwsIcon}></img>
          : <img src={LabIcon}></img>
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
    title: 'Access Level',
    dataIndex: 'accessLevel',
    key: 'accessLevel',
    
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

const TemplateTable =(props:Props)=> {
  
    return <Table columns={columns} dataSource={td}
    rowKey={t => String(t.id)}/>
  
}

const td: TemplateData[]=[
  {
    id: 1,
    name: 'AWS Machine Learning Template 1',
    createdAt: "2023-08-10T15:04:05Z",
    accessLevel: 2
  },
   {
    id: 2,
    name: 'AWS Machine Learning Template 1',
    createdAt: "2023-08-10T15:04:05Z",
    accessLevel: 2
  },
  {
    id: 3,
    name: 'AWS Machine Learning Template 1',
    createdAt: "2023-08-10T15:04:05Z",
    accessLevel: 2
  },
]
export default TemplateTable