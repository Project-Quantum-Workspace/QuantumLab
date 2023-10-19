
import { Form, Input, Select } from 'antd';
import React, { Component } from 'react'
import { JsonData } from '..';

type Props = {
  data: JsonData
}
const InputStyle = {
  marginTop: "10px"
}
export const TemplateCol = (props: Props) => {
  const data = props.data
  var options:Array<{value: string, label: string}>= []
  
  if(data.selections){
    data.selections.forEach((e)=>{
      options.push({value: e, label: e})
    })
  }
  
  return <>
    <Form.Item
      labelCol={{ flex: '30%' }}
      wrapperCol={{ span: '30%' }}
      label={data.label}
      name={data.name}
    >
      {data.isInput?<Input defaultValue={data.value}/>:
      <Select style={InputStyle} defaultValue={data.value} options={options}/>}
    </Form.Item>
   
  </>
}

