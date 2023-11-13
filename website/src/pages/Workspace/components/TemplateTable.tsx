import { ColumnsType } from 'antd/es/table'
import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Image } from 'antd'
import { history } from '@umijs/max'
import { DoubleRightOutlined } from '@ant-design/icons'
import TemplateApi from '@/services/quantumlab/template'
import { PageLoading } from '@ant-design/pro-components'
import { TemplateClass } from '@/utils/types/TemplateTypes'
import useTemplateStore from '@/stores/TemplateStore'

const TemplateTable = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { fetchedTemplates, setFetchedTemplates } = useTemplateStore()
  const handleTemplateinfo = (id: number) => {
    history.push('/templates/' + id);
  }
  const columns: ColumnsType<TemplateClass> = [
    {
      title: '',
      key: 'templateId',
      dataIndex: 'icon',
      render: (icon) => {
  
        return (<>
          <Image src={icon} />
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
      render: (t) => {
        return <a style={{ fontSize: '15px', color: 'black' }}>{t ? new Date(t).toLocaleString().substring(0, 9) : new Date().toLocaleString().substring(0, 9)}</a>
      }
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
          <Button 
            type='link'
            icon={<DoubleRightOutlined />} 
            onClick={() => handleTemplateinfo(id)}
            className='ant-icon-info'
          />
        </Space>
      ),
    },
  ]
  useEffect(() => {
    TemplateApi.getAccessibleTemplates()
      .then((res) => {
        setFetchedTemplates(res)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      })
  }, [])
  if (error) return <><h1>{error
  }</h1></>
  if (loading) {
    return <PageLoading />
  }
  return <Table columns={columns} dataSource={fetchedTemplates}
    rowKey={t => String(t.id)} />

}


export default TemplateTable