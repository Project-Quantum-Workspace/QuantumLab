
import { DataSelections, TemplateField } from '@/utils/types/TemplateTypes';
import { Form, Input, InputNumber, Select } from 'antd';
import React, { Component, useState } from 'react'


type Props = {
  data: TemplateField
}

const { Option } = Select;
export const TemplateCol = (props: Props) => {
  const data = props.data
  var options:Array<{name: string,label: string}>= []
  if(data.selections){
    
    data.selections.forEach((e)=>{
      
      options.push({name: e.name,label: e.name})
    })
  }
  
  return <>
    <Form.Item
      labelCol={{ flex: '30%' }}
      wrapperCol={{ span: '30%' }}
      label={data.label}
      name={data.name}
      extra={data.description}
    >
      {data.isInput?<InputNumber defaultValue={data.default}/>:
      <Select className="question"defaultValue={data.default}>
      {data.selections?.map((option: DataSelections, index: number) => (
        <Option key={index} value={option.name}>
          {option.name}
        </Option>
      ))}
    </Select>}
    </Form.Item>
   
  </>
}

