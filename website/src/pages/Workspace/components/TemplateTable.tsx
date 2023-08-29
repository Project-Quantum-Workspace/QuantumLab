import { ColumnsType } from 'antd/es/table'
import React, { Component, useEffect, useState } from 'react'
import AwsIcon from '@/assets/aws.svg'
import moment from 'moment'
import LabIcon from '@/assets/Lab_logo.svg'
import { Space, Table,Image } from 'antd'
import { Link } from '@umijs/max'
import { DoubleRightOutlined } from '@ant-design/icons'
import { getAccessibleTemplates } from '@/services/quantumlab/template'
import { PageLoading } from '@ant-design/pro-components'
import { TemplateMetaData } from '../utils/types/TemplateTypes'

interface Props {
  data: number | undefined
}

const columns: ColumnsType<TemplateMetaData> = [
  {
    title: '',
    key: 'templateId',
    dataIndex: 'icon',
    render: (icon) => {
      
      return (<>
        <Image src={icon}/>
      </>)
    }
  },
  {
    title: 'Name',
    dataIndex: 'filename',
    key: 'filename',
    render: (text) => <a style={{ fontSize: '15px', fontWeight: 'bold', color: 'black' }}>{text}</a>
  },
  {
    title: 'Date Created',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (t) => <a style={{ fontSize: '15px', color: 'black' }}>{moment(t).format("MMM Do YYYY")}</a>
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
        <Link to={'/template/' + `${id}`}>
          <DoubleRightOutlined />
        </Link>
      </Space>
    ),
  },
]

const TemplateTable = (props: Props) => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(()=>{
    getAccessibleTemplates()
    .then((res)=>{
      setTemplates(res);
      setLoading(false);
    })
    .catch((error)=>{
      console.log(error);
      setError(error.message);
    })
  },[])
  if(error)return <><h1>{error
  }</h1></>
  if(loading){
    return <PageLoading/>
  }
  return <Table columns={columns} dataSource={templates}
    rowKey={t => String(t.id)} />

}


export default TemplateTable